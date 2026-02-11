# Contributing Guide

Thank you for your interest in contributing to the World Weather App! 🎉

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/BreFranca/world-weather-app.git
   cd world-weather-app
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### 1. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Keep components small and focused

### 2. Test Your Changes

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Check linting
npm run lint

# Type check
npx tsc --noEmit

# Build to ensure no errors
npm run build
```

### 3. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Feature
git commit -m "feat: add dark mode support"

# Bug fix
git commit -m "fix: resolve temperature conversion issue"

# Documentation
git commit -m "docs: update API documentation"

# Performance
git commit -m "perf: optimize map rendering"

# Tests
git commit -m "test: add E2E tests for forecast"
```

### 4. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub.

## Code Style Guidelines

### TypeScript

- Use strict mode
- Avoid `any` types
- Use interfaces over types when possible
- Export types alongside components

### React

- Use functional components
- Prefer custom hooks for logic
- Use `useMemo` and `useCallback` appropriately
- Keep components under 200 lines

### Naming Conventions

- Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: Match component names

### Project Structure

```
src/
├── components/       # React components
│   └── Feature/     # Group by feature
│       ├── Component.tsx
│       └── __tests__/
├── hooks/           # Custom hooks
├── services/        # API calls
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## Testing Guidelines

### Unit Tests

- Test utility functions thoroughly
- Mock external dependencies
- Use descriptive test names

### Integration Tests

- Test component interactions
- Mock API calls
- Test user workflows

### E2E Tests

- Test critical user paths
- Keep tests independent
- Use semantic selectors

## Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Update CHANGELOG.md** if applicable
5. **Link related issues**

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing done

## Screenshots (if applicable)

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex logic
- [ ] Updated documentation
- [ ] No new warnings
```

## Reporting Bugs

### Before Submitting

- Check existing issues
- Verify it's not already fixed
- Try to reproduce consistently

### Bug Report Template

```markdown
**Describe the bug**
Clear description

**To Reproduce**
Steps to reproduce:

1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**

- OS: [e.g. macOS]
- Browser: [e.g. Chrome 91]
- Node version: [e.g. 18.0.0]

**Additional context**
Any other information
```

## Feature Requests

We love new ideas! Please:

- Check if it already exists
- Explain the use case
- Consider implementation impact

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Give constructive feedback
- Focus on the code, not the person

## Questions?

- Open a GitHub Discussion
- Check the documentation
- Ask in pull request comments

---

Thank you for contributing! 🚀
