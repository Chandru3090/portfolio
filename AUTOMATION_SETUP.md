# Portfolio Automation Setup

This guide explains the automated testing, linting, and deployment pipeline for your portfolio.

## Overview

The automation pipeline consists of:

1. **Pre-commit Hooks** - Lint & test before each commit
2. **Unit Tests** - Vitest for component testing
3. **E2E Tests** - Playwright for full user journey testing
4. **CI/CD Pipeline** - GitHub Actions for automated testing
5. **Jira Integration** - Automatic test results reporting to Jira tickets

## Installation

### 1. Install Dependencies

```bash
npm install
```

This installs:
- `vitest` - Unit test framework
- `@playwright/test` - E2E testing framework
- `husky` - Git hooks manager
- `lint-staged` - Run linters on staged files
- `@testing-library/react` - React testing utilities

### 2. Initialize Husky

```bash
npm run prepare
```

This sets up git hooks that will run before each commit.

## Pre-Commit Workflow

When you try to commit code:

```bash
git commit -m "Your commit message"
```

The following will run automatically:

1. **Linting** - Runs `oxlint` on staged files
2. **Type Checking** - Runs TypeScript compiler (`tsc`)
3. **Unit Tests** - Runs failing unit tests via `vitest --bail`

If any of these fail, your commit will be blocked. Fix the issues and try again.

### Force Commit (use cautiously)

To skip pre-commit hooks:

```bash
git commit --no-verify
```

⚠️ Not recommended - the CI pipeline will still catch issues.

## Running Tests Locally

### Unit Tests

```bash
# Run all tests
npm run test

# Watch mode (re-run on file changes)
npm run test -- --watch

# Run with UI dashboard
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Interactive test mode (pick which tests to run)
npm run test:e2e:ui

# Debug a specific test
npm run test:e2e:debug
```

## CI/CD Pipeline (GitHub Actions)

When you push to `main` or `develop`, or create a PR:

### Phase 1: Lint & Unit Tests
- Runs on Node 18 & 20
- Linter checks
- Unit test suite
- Coverage report uploaded to Codecov

### Phase 2: E2E Tests (after Phase 1)
- Builds the project
- Runs Playwright tests in 3 browsers:
  - Chromium
  - Firefox
  - WebKit
- Generates HTML report
- Uploads as artifact
- Reports to Jira (if configured)

## Writing Tests

### Unit Tests

Create test files next to components with `.test.tsx` extension:

```typescript
// src/components/Hero/Hero.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './index';

describe('Hero', () => {
  it('renders heading', () => {
    render(<Hero />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
```

**Test Checklist:**
- ✅ Component renders
- ✅ Props work correctly
- ✅ User interactions work (clicks, forms)
- ✅ Error states display
- ✅ Responsive behavior

### E2E Tests

Create test files in `e2e/` with `.spec.ts` extension:

```typescript
// e2e/example.spec.ts
import { test, expect } from '@playwright/test';

test('user journey', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /View Work/i }).click();
  await expect(page.locator('#projects')).toBeVisible();
});
```

**Test Checklist:**
- ✅ Page loads correctly
- ✅ Navigation works
- ✅ Forms submit successfully
- ✅ API calls succeed
- ✅ Responsive on mobile/tablet

## Jira Integration

### Setup

1. **Get Jira Credentials**
   - Go to `account.atlassian.com`
   - Create API token
   - Note your email

2. **Add GitHub Secrets**
   - Go to your GitHub repo → Settings → Secrets
   - Add these secrets:
     - `JIRA_HOST` - Your Jira domain (e.g., `your-org.atlassian.net`)
     - `JIRA_USER` - Your Jira email
     - `JIRA_TOKEN` - Your API token

3. **Link PR to Jira**
   - Include issue key in your branch name: `PROJ-123-feature-name`
   - OR in PR description: `PROJ-123`
   - OR in git commit description

### Test Results Reporting

After E2E tests complete, results are automatically posted to your Jira ticket:

```
h3. E2E Test Report
Timestamp: 2024-01-15T10:30:00Z
Branch: main
Commit: a1b2c3d

||Metric||Value||
|Total Tests|42|
|✅ Passed|41|
|❌ Failed|1|
|⏭️ Skipped|0|
|Success Rate|97.62%|

h4. Failed Tests
* should validate email format
  error: Expected "Valid email required"...

[View Full Report|https://github.com/...artifacts/playwright-report]
```

## Vercel Deployment Integration

### Post-Deployment Testing

After each Vercel deployment:

1. E2E tests run against the production URL
2. Results are added to Jira ticket
3. HTML report uploaded as GitHub artifact

### Configure Preview Deployments

In `.github/workflows/test.yml`, modify `playwright.config.ts`:

```typescript
use: {
  baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:5173',
}
```

## Troubleshooting

### Pre-commit hook not running?

```bash
# Reinstall husky
npm run prepare

# Check hook permissions
ls -la .husky/
```

### Tests fail locally but pass in CI?

- Check Node version: `node --version`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for environment variables

### E2E tests timeout

- Increase timeout: Add `timeout: 30000` to test
- Check dev server is running: `npm run dev`
- Check network issues

### Jira reporting fails

- Verify credentials in GitHub Secrets
- Check issue key format (e.g., `PROJ-123`)
- View logs in GitHub Actions

## File Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── test.yml              # GitHub Actions CI/CD config
├── .husky/
│   └── pre-commit                # Pre-commit hook script
├── e2e/
│   ├── home.spec.ts              # E2E tests for home page
│   └── contact.spec.ts           # E2E tests for contact form
├── src/
│   └── test/
│       ├── setup.ts              # Vitest configuration
│       ├── Hero.test.tsx         # Unit tests for Hero
│       └── Contact.test.tsx      # Unit tests for Contact
├── scripts/
│   └── jira-reporter.js          # Jira API integration script
├── .lintstagedrc.json            # Lint-staged configuration
├── vitest.config.ts              # Vitest configuration
├── playwright.config.ts          # Playwright configuration
└── package.json                  # Project dependencies
```

## Next Steps

1. **Install dependencies**: `npm install`
2. **Initialize husky**: `npm run prepare`
3. **Run tests locally**: `npm run test && npm run test:e2e`
4. **Push to GitHub**: Tests will run in CI/CD
5. **Configure Jira** (optional): Add GitHub secrets for Jira integration
6. **Create more tests**: Follow patterns in sample test files

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run lint` | Run linter |
| `npm run lint:fix` | Fix lint errors |
| `npm run test` | Run unit tests |
| `npm run test:ui` | Open test UI |
| `npm run test:coverage` | Generate coverage |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:e2e:ui` | Interactive E2E mode |
| `npm run prepare` | Setup husky hooks |

## Support

For more info:
- Vitest docs: https://vitest.dev
- Playwright docs: https://playwright.dev
- Husky docs: https://typicode.github.io/husky
- Jira API: https://developer.atlassian.com/cloud/jira/rest
