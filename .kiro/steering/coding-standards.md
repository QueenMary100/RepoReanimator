# RepoReanimator Coding Standards

## General Principles

### Code Quality
- Write clean, readable, and maintainable code
- Follow SOLID principles
- Keep functions small and focused (single responsibility)
- Use meaningful variable and function names
- Add comments for complex logic only

### TypeScript
- **Always use TypeScript** - no JavaScript files
- Enable strict mode in tsconfig.json
- Define explicit types for function parameters and return values
- Use interfaces for object shapes
- Use enums for fixed sets of values
- Avoid `any` type - use `unknown` if type is truly unknown

### Architecture
- **Backend**: Follow layered architecture
  - Routes → Controllers → Services → Database
  - Keep business logic in services
  - Controllers handle HTTP concerns only
  - Use dependency injection where appropriate
  
- **Frontend**: Component-based architecture
  - Separate presentational and container components
  - Use custom hooks for reusable logic
  - Keep components small and focused
  - Use Zustand for global state
  - Use React Query for server state

### Error Handling
- Always handle errors gracefully
- Use try-catch blocks for async operations
- Return meaningful error messages
- Log errors with context
- Use custom error classes (AppError)

### Database
- Use Prisma ORM for all database operations
- Define clear relationships in schema
- Add indexes for frequently queried fields
- Use transactions for multi-step operations
- Validate data before database operations

### API Design
- Follow RESTful conventions
- Use proper HTTP methods (GET, POST, PATCH, DELETE)
- Return consistent response formats
- Include pagination for list endpoints
- Use query parameters for filtering
- Version APIs if needed (/api/v1)

### Security
- Validate all user inputs
- Sanitize data before database operations
- Use parameterized queries (Prisma handles this)
- Implement rate limiting
- Use HTTPS in production
- Store secrets in environment variables
- Hash sensitive data (passwords, tokens)

### Testing
- Write unit tests for services and utilities
- Write integration tests for API endpoints
- Mock external dependencies
- Aim for 80%+ code coverage
- Test edge cases and error scenarios

### Performance
- Use database indexes appropriately
- Implement caching for expensive operations (Redis)
- Paginate large result sets
- Optimize database queries (avoid N+1)
- Use lazy loading for images
- Minimize bundle size

### UI/UX
- Follow the spooky dark theme consistently
- Use Tailwind utility classes
- Implement responsive design (mobile-first)
- Add loading states for async operations
- Show error messages clearly
- Use animations sparingly (Framer Motion)
- Ensure accessibility (ARIA labels, keyboard navigation)

### Git Workflow
- Write clear commit messages
- Use feature branches
- Keep commits atomic and focused
- Review code before merging
- Update documentation with code changes

### Documentation
- Document complex functions with JSDoc
- Keep README up to date
- Document API endpoints
- Add inline comments for non-obvious code
- Update .env.example when adding new variables

## Naming Conventions

### Files
- Components: PascalCase (UserProfile.tsx)
- Utilities: camelCase (formatDate.ts)
- Types: PascalCase (User.types.ts)
- Tests: *.test.ts or *.spec.ts

### Code
- Variables/Functions: camelCase
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE
- Interfaces: PascalCase with 'I' prefix optional
- Types: PascalCase
- Enums: PascalCase

### Database
- Tables: PascalCase (User, GitHubRepo)
- Columns: camelCase (createdAt, githubId)
- Relations: camelCase plural (revivals, contributions)

## Code Formatting
- Use Prettier for consistent formatting
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multi-line objects/arrays
- Max line length: 100 characters

## Spooky Theme Guidelines
- Primary color: Purple (#8B5CF6)
- Secondary color: Pink (#EC4899)
- Background: Dark blue (#0F172A)
- Use glow effects for important elements
- Add subtle animations for interactivity
- Use ghost/graveyard themed icons and imagery
- Maintain dark mode throughout

## MCP Tool Development
- Follow the spec.yaml schema strictly
- Validate inputs thoroughly
- Return structured, consistent outputs
- Handle GitHub API rate limits
- Cache results when appropriate
- Log analysis steps for debugging

## Agent Hooks
- Define clear trigger conditions
- Keep hook logic simple and focused
- Handle failures gracefully
- Log hook executions
- Test hooks thoroughly before deployment
