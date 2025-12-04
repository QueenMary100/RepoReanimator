# Contributing to RepoReanimator

Thank you for your interest in contributing to RepoReanimator! 🎃

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to learn and build together.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. Check if the feature has been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the coding standards in `.kiro/steering/coding-standards.md`
4. Write tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Commit with clear messages (`git commit -m 'feat: add amazing feature'`)
7. Push to your fork (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Commit Message Convention

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add user profile page
fix: resolve XP calculation bug
docs: update API documentation
test: add tests for StreakManager
```

## Development Setup

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

## Coding Standards

### TypeScript
- Use strict mode
- Define explicit types
- Avoid `any` type
- Use interfaces for object shapes

### Code Style
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Max line length: 100 characters

### Testing
- Write unit tests for services
- Write integration tests for APIs
- Aim for 80%+ coverage
- Test edge cases

### Documentation
- Add JSDoc comments for complex functions
- Update README when adding features
- Document API endpoints
- Keep examples up to date

## Project Structure

```
backend/
  src/
    controllers/  # HTTP handlers
    services/     # Business logic
    routes/       # API routes
    middleware/   # Express middleware
    utils/        # Utilities

frontend/
  src/
    app/          # Next.js pages
    components/   # React components
    lib/          # Utilities
    types/        # TypeScript types
```

## Testing

```bash
# Backend
cd backend
npm test
npm run test:coverage

# Frontend
cd frontend
npm run type-check
npm run lint
```

## Review Process

1. Automated checks must pass (CI/CD)
2. Code review by maintainer
3. Address feedback
4. Merge when approved

## Questions?

Feel free to ask questions in:
- GitHub Issues
- Pull Request comments
- Discussions

Thank you for contributing! 🎃👻
