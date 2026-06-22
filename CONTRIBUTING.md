# Contributing

Thank you for your interest in contributing to Next.js App Template! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/next-app-template.git
   cd next-app-template
   ```
3. **Add upstream remote** to keep your fork in sync:
   ```bash
   git remote add upstream https://github.com/akshayark97/next-app-template.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Fill in required values for services you want to test
   ```

## Development

### Running the dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database setup (optional)
```bash
npm run db:migrate
npm run db:seed  # Optional: seed with placeholder data
```

### Code quality

We use **Biome** for linting and formatting:
```bash
npm run lint         # Check for issues
npm run lint:fix     # Auto-fix issues
npm run format       # Format code
npm run typecheck    # TypeScript type checking
```

Make sure your code passes these checks before submitting a PR.

### Testing

Run tests before submitting:
```bash
npm run test         # Unit tests (Vitest)
npm run test:watch   # Watch mode
npm run test:e2e     # E2E tests (Playwright)
npm run test:e2e:ui  # E2E test UI
```

## Submitting Changes

### Before you start
- Check existing [Issues](https://github.com/akshayark97/next-app-template/issues) and [PRs](https://github.com/akshayark97/next-app-template/pulls) to avoid duplicates
- For significant changes, open an issue first to discuss the approach

### Creating a PR
1. **Create a feature branch** with a descriptive name:
   ```bash
   git checkout -b feature/add-dark-mode
   # or
   git checkout -b fix/typo-in-readme
   ```

2. **Make your changes** and commit with clear messages:
   ```bash
   git commit -m "Add dark mode toggle to navigation"
   ```

3. **Keep commits clean**:
   - One logical change per commit
   - Write descriptive commit messages
   - Reference issues when relevant (e.g., "Fixes #123")

4. **Run the full test suite** before pushing:
   ```bash
   npm run typecheck
   npm run lint:fix
   npm run test
   npm run test:e2e
   ```

5. **Sync with upstream** before pushing:
   ```bash
   git fetch upstream
   git rebase upstream/main
   git push origin feature/your-feature-name
   ```

6. **Open a PR** on GitHub with:
   - Clear title describing the change
   - Description of what changed and why
   - Reference to any related issues
   - Screenshots if UI changes

## Types of Contributions

### Bug Reports
- Describe the issue clearly with reproduction steps
- Include your environment (OS, Node version, browser)
- Share any error messages or logs

### Feature Requests
- Explain the use case and benefits
- Provide examples if applicable
- Be open to discussion about implementation

### Documentation
- Fix typos or unclear explanations
- Add examples for complex features
- Improve setup instructions

### Code Improvements
- Performance optimizations
- Code simplification or refactoring
- Better error handling
- Additional tests

## Code Style

- Follow the existing code patterns in the repository
- Use TypeScript for type safety
- Keep components focused and reusable
- Add comments only for non-obvious logic
- Use Biome's auto-formatting (`npm run lint:fix`)

## Commit Message Guidelines

- Use clear, descriptive messages
- Use imperative mood ("Add feature" not "Added feature")
- Reference issues when relevant: "Fixes #123"
- Keep messages concise but informative

## Questions?

- Open a [GitHub Issue](https://github.com/akshayark97/next-app-template/issues)
- Check existing discussions for similar questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
