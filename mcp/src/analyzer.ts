import { Octokit } from '@octokit/rest';
import { AnalyzeRepoInput, AnalysisResult, Issue, Recommendation } from './types.js';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * Parse GitHub URL to extract owner and repo
 */
function parseGitHubUrl(url: string): { owner: string; repo: string } {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error('Invalid GitHub URL');
  }
  return { owner: match[1], repo: match[2].replace('.git', '') };
}

/**
 * Analyze repository
 */
export async function analyzeRepository(input: AnalyzeRepoInput): Promise<AnalysisResult> {
  const { repoUrl, depth } = input;
  const { owner, repo } = parseGitHubUrl(repoUrl);

  const issues: Issue[] = [];
  const recommendations: Recommendation[] = [];
  let filesAnalyzed = 0;

  // Get repository data
  const { data: repoData } = await octokit.repos.get({ owner, repo });

  // Get last commit
  const { data: commits } = await octokit.repos.listCommits({
    owner,
    repo,
    per_page: 1,
  });

  const lastCommitDate = commits[0]?.commit.author?.date 
    ? new Date(commits[0].commit.author.date)
    : new Date(repoData.updated_at);

  const daysSinceLastCommit = Math.floor(
    (Date.now() - lastCommitDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate abandonment score
  let abandonmentScore = 0;

  // Time-based scoring
  if (daysSinceLastCommit > 730) {
    abandonmentScore += 40;
    issues.push({
      category: 'activity',
      severity: 'critical',
      description: `No commits in over 2 years (${daysSinceLastCommit} days)`,
    });
  } else if (daysSinceLastCommit > 365) {
    abandonmentScore += 30;
    issues.push({
      category: 'activity',
      severity: 'high',
      description: `No commits in over 1 year (${daysSinceLastCommit} days)`,
    });
  } else if (daysSinceLastCommit > 180) {
    abandonmentScore += 20;
    issues.push({
      category: 'activity',
      severity: 'medium',
      description: `No commits in over 6 months (${daysSinceLastCommit} days)`,
    });
  }

  // Open issues scoring
  if (repoData.open_issues_count > 50) {
    abandonmentScore += 20;
    issues.push({
      category: 'maintenance',
      severity: 'high',
      description: `${repoData.open_issues_count} open issues`,
    });
    recommendations.push({
      type: 'fix_bugs',
      priority: 'high',
      title: 'Address Open Issues',
      description: `Triage and close ${repoData.open_issues_count} open issues`,
      estimatedEffort: 'hard',
      xpReward: 100,
    });
  } else if (repoData.open_issues_count > 20) {
    abandonmentScore += 15;
    issues.push({
      category: 'maintenance',
      severity: 'medium',
      description: `${repoData.open_issues_count} open issues`,
    });
  }

  // Check README
  try {
    const { data: readme } = await octokit.repos.getReadme({ owner, repo });
    const content = Buffer.from(readme.content, 'base64').toString('utf-8');
    filesAnalyzed++;

    const lowerContent = content.toLowerCase();
    const incompleteIndicators = ['todo', 'coming soon', 'wip', 'under construction'];

    if (incompleteIndicators.some(indicator => lowerContent.includes(indicator))) {
      abandonmentScore += 10;
      issues.push({
        category: 'documentation',
        severity: 'medium',
        description: 'README contains incomplete sections',
        location: 'README.md',
      });
      recommendations.push({
        type: 'update_docs',
        priority: 'medium',
        title: 'Complete README',
        description: 'Finish incomplete sections in README',
        estimatedEffort: 'easy',
        xpReward: 25,
      });
    }

    if (content.length < 500) {
      issues.push({
        category: 'documentation',
        severity: 'low',
        description: 'README is very short',
        location: 'README.md',
      });
    }
  } catch (error) {
    abandonmentScore += 10;
    issues.push({
      category: 'documentation',
      severity: 'high',
      description: 'No README file found',
    });
    recommendations.push({
      type: 'update_docs',
      priority: 'high',
      title: 'Add README',
      description: 'Create comprehensive README with setup instructions',
      estimatedEffort: 'medium',
      xpReward: 50,
    });
  }

  // Check for package.json (dependencies)
  if (depth !== 'quick') {
    try {
      const { data: packageFile } = await octokit.repos.getContent({
        owner,
        repo,
        path: 'package.json',
      });

      if ('content' in packageFile) {
        filesAnalyzed++;
        abandonmentScore += 10;
        issues.push({
          category: 'dependencies',
          severity: 'medium',
          description: 'Dependencies may be outdated',
          location: 'package.json',
        });
        recommendations.push({
          type: 'fix_dependencies',
          priority: 'high',
          title: 'Update Dependencies',
          description: 'Update npm packages to latest versions',
          estimatedEffort: 'medium',
          xpReward: 50,
        });
      }
    } catch (error) {
      // No package.json
    }
  }

  // Check for tests
  if (depth === 'deep') {
    try {
      const { data: contents } = await octokit.repos.getContent({
        owner,
        repo,
        path: '',
      });

      if (Array.isArray(contents)) {
        const hasTests = contents.some(item => 
          item.name.includes('test') || item.name.includes('spec')
        );

        if (!hasTests) {
          issues.push({
            category: 'quality',
            severity: 'medium',
            description: 'No test files found',
          });
          recommendations.push({
            type: 'add_tests',
            priority: 'medium',
            title: 'Add Tests',
            description: 'Create unit and integration tests',
            estimatedEffort: 'hard',
            xpReward: 100,
          });
        }
      }
    } catch (error) {
      // Error reading contents
    }
  }

  // Calculate health score
  const healthScore = Math.max(0, 100 - abandonmentScore);

  return {
    healthScore,
    abandonmentScore: Math.min(abandonmentScore, 100),
    issues,
    recommendations,
    metadata: {
      analyzedAt: new Date().toISOString(),
      analysisDepth: depth,
      filesAnalyzed,
    },
  };
}
