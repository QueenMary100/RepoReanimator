# Lovable Frontend Integration Examples

## 🎯 Quick Integration for Your Lovable App

These are ready-to-use code snippets for integrating your Lovable frontend with the RepoReanimator backend.

## 📦 Setup API Client

Create `src/lib/api.ts`:

```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## 🔐 Authentication

### GitHub OAuth Login Button

```typescript
import { Github } from 'lucide-react';

export function GitHubLoginButton() {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = `${import.meta.env.VITE_API_URL}/api/auth/github/callback`;
    const scope = 'read:user user:email';
    
    window.location.href = 
      `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 
                 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow 
                 transition-all duration-300"
    >
      <Github className="w-5 h-5" />
      Sign in with GitHub
    </button>
  );
}
```

### Auth Callback Handler

```typescript
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (error) {
      console.error('Auth error:', error);
      navigate('/');
      return;
    }

    if (token) {
      localStorage.setItem('auth_token', token);
      
      // Fetch user data
      api.get('/users/me')
        .then(({ data }) => {
          console.log('User logged in:', data.user);
          navigate('/dashboard');
        })
        .catch((err) => {
          console.error('Failed to fetch user:', err);
          navigate('/');
        });
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-400">Completing sign in...</p>
      </div>
    </div>
  );
}
```

## 📊 Dashboard Components

### User Stats Cards

```typescript
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Trophy, Zap, Flame, Star } from 'lucide-react';

export function DashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/me')
      .then(({ data }) => {
        setStats(data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!stats) {
    return <div>Failed to load stats</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<Zap className="w-6 h-6" />}
        title="Total XP"
        value={stats.xp.toLocaleString()}
        color="purple"
      />
      <StatCard
        icon={<Trophy className="w-6 h-6" />}
        title="Level"
        value={stats.level}
        color="pink"
      />
      <StatCard
        icon={<Flame className="w-6 h-6" />}
        title="Current Streak"
        value={`${stats.currentStreak} days`}
        color="orange"
      />
      <StatCard
        icon={<Star className="w-6 h-6" />}
        title="Longest Streak"
        value={`${stats.longestStreak} days`}
        color="green"
      />
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  const colorClasses = {
    purple: 'bg-purple-500/20 text-purple-400',
    pink: 'bg-pink-500/20 text-pink-400',
    orange: 'bg-orange-500/20 text-orange-400',
    green: 'bg-green-500/20 text-green-400',
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
```

## 🔍 Discover Repos Page

```typescript
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Search, Filter } from 'lucide-react';

export function DiscoverPage() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    topics: [],
    language: '',
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    setLoading(true);
    api.get('/repos/discover', { params: filters })
      .then(({ data }) => {
        setRepos(data.repos);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch repos:', err);
        setLoading(false);
      });
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
        Discover Abandoned Repos
      </h1>

      {/* Filters */}
      <div className="mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Search by topic..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
          onChange={(e) => setFilters({ ...filters, topics: [e.target.value] })}
        />
        <select
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
        >
          <option value="">All Languages</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Python">Python</option>
          <option value="Go">Go</option>
          <option value="Rust">Rust</option>
        </select>
      </div>

      {/* Repos Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}

function RepoCard({ repo }) {
  const [claiming, setClaiming] = useState(false);

  const handleClaim = async () => {
    setClaiming(true);
    try {
      await api.post('/revivals/claim', { repoId: repo.id });
      alert('Repo claimed successfully!');
    } catch (err) {
      console.error('Failed to claim repo:', err);
      alert('Failed to claim repo');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-purple-500 hover:shadow-glow transition-all">
      <h3 className="text-xl font-bold text-white mb-2">{repo.fullName}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {repo.description || 'No description'}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {repo.topics.slice(0, 3).map((topic) => (
          <span key={topic} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
            {topic}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xs text-gray-400">Health Score</p>
          <p className="text-lg font-bold text-green-400">{repo.healthScore.toFixed(0)}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Abandonment</p>
          <p className="text-lg font-bold text-red-400">{repo.abandonmentScore.toFixed(0)}%</p>
        </div>
      </div>

      <button
        onClick={handleClaim}
        disabled={claiming}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50"
      >
        {claiming ? 'Claiming...' : 'Claim Revival'}
      </button>
    </div>
  );
}
```

## 🏆 Leaderboard Page

```typescript
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Trophy, Medal } from 'lucide-react';

export function LeaderboardPage() {
  const [entries, setEntries] = useState([]);
  const [period, setPeriod] = useState('weekly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/leaderboard', { params: { period } })
      .then(({ data }) => {
        setEntries(data.entries);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch leaderboard:', err);
        setLoading(false);
      });
  }, [period]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
        Leaderboard
      </h1>

      {/* Period Tabs */}
      <div className="flex gap-4 mb-8">
        {['daily', 'weekly', 'monthly', 'all_time'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              period === p
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
          >
            {p.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-gray-400">Rank</th>
                <th className="px-6 py-4 text-left text-gray-400">User</th>
                <th className="px-6 py-4 text-right text-gray-400">XP</th>
                <th className="px-6 py-4 text-right text-gray-400">Revivals</th>
                <th className="px-6 py-4 text-right text-gray-400">Contributions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.userId} className="border-t border-slate-700 hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {entry.rank <= 3 && (
                        <Trophy className={`w-5 h-5 ${
                          entry.rank === 1 ? 'text-yellow-400' :
                          entry.rank === 2 ? 'text-gray-400' :
                          'text-orange-400'
                        }`} />
                      )}
                      <span className="text-white font-bold">#{entry.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className=** 🎃👻
roject!le pyour Lovab into py-paste ready to comples are*These exa

---

*t_id
```clien_github_ID=yourNT_LIETHUB_Cpp
VITE_GIailway.a.rurlr-backend-youL=https://PI_URTE_A`
VI``d:

ings, adoject settble prur Lova
In yoble
es for Lovablment VariaEnviron

## 📝  test!andoy [ ] Depl. Lovable
8ables in t varienronmenvi7. [ ] Set 
ageoard pAdd leaderb
6. [ ] cardsepo page with rcover ] Create disats
5. [ rd with stAdd dashboa ] te
4. [ roucallbackuth Create a ] 
3. [ding pageanto ltton gin bu loAdd GitHub2. [ ] `
/lib/api.tsde to `src client coAPI. [ ] Copy t

1klisk Start Chec 🚀 Quic```

##;
}
 infinite-in-outt 3s ease floaation:
  animte-float {
}

.anima(-20px); } translateY{ transform: 50% ; }
 lateY(0px)sform: trans% { tran%, 100t {
  0floaes eyfram*/
@kmation niting aloa

/* F
}clip: text;nd-kgrouent;
  bacr: transparfill-colot-text-;
  -webki textound-clip:backgr
  -webkit-;99 100%)F6 0%, #EC48#8B5Ct(135deg, ieninear-gradckground: lnt {
  ba.text-gradiext */
nt teGradie
/* 
 0.5);
}, 153,(236, 72 0 20px rgbaw: 0dox-shabo{
  glow-pink dow-
.sha 0.5);
}
92, 246,ba(139, x rg0phadow: 0 0 2 {
  box-s-glow
.shadoweffects */Spooky glow * 
```css
/onfig:
wind c CSS or Tailglobal your hese tole

Add tor Lovabng Tips f## 🎨 Styli}
```

;
</div>
  )
    >
      )}div   </le>
        </tabdy>
          </tbo    
         ))}             </tr>
             /td>
    <             ons}
 butitritry.con       {en          ">
   t-whitet-right tex py-4 texx-6ame="p  <td classN           
     d>        </t       
   }ivalsry.rev {ent               
    hite">ht text-wt-rig-4 tex py"px-6assName= cl <td              >
          </td      ()}
     ringtoLocaleSt.xp.      {entry           ">
   font-boldurple-400 t text-p4 text-righ="px-6 py-className      <td          
      </td>      
               </div>         span>
     ername}</try.us">{ent-semiboldonhite f"text-wn className=<spa            
             />                 l"
  ded-ful h-10 rounme="w-10  classNa                  rname}
    t={entry.use   al                     
.avatarUrl}src={entry                  img
           <                -3">
 gap-center x items"fle