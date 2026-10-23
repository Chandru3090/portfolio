# Setup Instructions - Automated Testing & CI/CD

Follow these steps to complete the automation setup for your portfolio project.

## Step 1: Install Dependencies

```bash
npm install
```

This installs all testing, linting, and automation tools.

**Installed packages:**
- `vitest` - Unit testing framework
- `@testing-library/react` - React component testing
- `@playwright/test` - End-to-end testing
- `husky` - Git hooks automation
- `lint-staged` - Run tools on staged files
- `jsdom` - DOM environment for tests

## Step 2: Initialize Husky (Pre-commit Hooks)

```bash
npm run prepare
```

This sets up git hooks that automatically run before each commit.

**What happens on every commit:**
- ✅ Linting (oxlint) on changed files
- ✅ TypeScript type checking
- ✅ Unit tests on changed code
- ❌ Commit blocked if any check fails

## Step 3: Run Tests Locally

### Test Unit Components

```bash
npm run test
```

This runs all `.test.tsx` files in `src/test/`.

### Generate Test Coverage Report

```bash
npm run test:coverage
```

Creates a coverage report in `coverage/` directory.

### Run E2E Tests

First, start the dev server:

```bash
npm run dev
```

In another terminal:

```bash
npm run test:e2e
```

## Step 4: Configure GitHub Secrets (for Jira Integration)

To automatically report test results to Jira:

1. Go to GitHub → Your Repo → Settings → Secrets and Variables → Actions
2. Click **New repository secret** and add:

| Secret Name | Value |
|-------------|-------|
| `JIRA_HOST` | your-org.atlassian.net |
| `JIRA_USER` | your-email@company.com |
| `JIRA_TOKEN` | [Get from account.atlassian.com] |

### How to Get Jira API Token

1. Visit https://id.atlassian.com/manage/api-tokens
2. Click **Create API token**
3. Copy the token and add to GitHub Secrets

## Step 5: Link PR to Jira (Auto Test Reporting)

When you create a PR, include the Jira issue key in:

**Option A: Branch Name**
```bash
git checkout -b PROJ-123-feature-description
```

**Option B: PR Title/Description**
```
Implement new feature - PROJ-123
```

When tests complete, results will automatically post to the Jira ticket.

## Step 6: Push Code to GitHub

```bash
git add .
git commit -m "Setup automated testing and CI/CD"
git push origin main
```

The GitHub Actions workflow will automatically:
1. Run linting and unit tests
2. Build the project
3. Run E2E tests in 3 browsers
4. Upload reports as artifacts
5. Report results to Jira (if configured)

## Workflow Diagram

```
Developer Commits Code
    ↓
[Pre-commit Hook]
  ├─ oxlint
  ├─ tsc (type check)
  └─ vitest (unit tests)
    ↓
If Pass → Commit Allowed
If Fail → Commit Blocked
    ↓
Push to GitHub
    ↓
[GitHub Actions - test.yml]
  ├─ Lint & Unit Tests (Node 18, 20)
  │   ├─ npm run lint
  │   ├─ npm run test:coverage
  │   └─ Upload to Codecov
  ├─ E2E Tests
  │   ├─ npm run build
  │   ├─ npm run test:e2e (3 browsers)
  │   └─ Upload HTML report
  └─ Report to Jira
      └─ POST test results comment
    ↓
Deploy to Vercel
    ↓
Post-Deploy E2E Tests
    ↓
Update Jira Ticket
```

## Quick Test

To verify everything works:

```bash
# 1. Run linter
npm run lint

# 2. Run unit tests
npm run test

# 3. Run E2E tests (needs dev server running)
npm run dev  # in one terminal
npm run test:e2e  # in another

# 4. Create a test commit
git add .
git commit -m "test: setup automation"
```

## File Structure Added

```
portfolio/
├── .github/workflows/
│   └── test.yml                  ← GitHub Actions CI/CD
├── .husky/
│   └── pre-commit                ← Auto-run before commits
├── e2e/
│   ├── home.spec.ts              ← Page navigation tests
│   └── contact.spec.ts           ← Form submission tests
├── src/test/
│   ├── setup.ts                  ← Vitest config
│   ├── Hero.test.tsx             ← Hero component tests
│   └── Contact.test.tsx          ← Contact form tests
├── scripts/
│   └── jira-reporter.js          ← Jira API integration
├── .lintstagedrc.json            ← Lint-staged config
├── vitest.config.ts              ← Unit test config
├── playwright.config.ts          ← E2E test config
└── AUTOMATION_SETUP.md           ← Full documentation
```

## Next: Vercel Deployment

After GitHub Actions is working:

1. **Connect GitHub to Vercel**
   - Go to https://vercel.com
   - Click "New Project" → Connect your GitHub repo
   - Follow the deployment wizard

2. **Auto-deploy on Push**
   - Vercel automatically deploys when you push to main
   - Review URLs for preview deployments
   - Tests run before production deployment

3. **Run E2E Tests on Staging**
   - Tests run on Vercel preview URL
   - Results post to Jira with staging URL
   - Approval before promoting to production

## Troubleshooting

### Problem: Commit is blocked

```bash
# Check what's failing
npm run lint
npm run test
npm run test:e2e

# Fix the issues, then commit again
```

### Problem: Husky hooks not working

```bash
# Reinstall husky
npm run prepare

# Make hook executable
chmod +x .husky/pre-commit

# Try committing again
```

### Problem: GitHub Actions fails

1. Check workflow logs: GitHub → Actions → test.yml
2. Common issues:
   - Missing GitHub Secrets
   - Node version mismatch
   - Playwright browser not installed

### Problem: Playwright tests timeout

Add to `e2e/*.spec.ts`:

```typescript
test.setTimeout(60000); // 60 second timeout
```

## Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run lint` | Check code style |
| `npm run lint:fix` | Auto-fix style issues |
| `npm run test` | Run unit tests |
| `npm run test:ui` | Visual test dashboard |
| `npm run test:coverage` | Coverage report |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:e2e:ui` | Interactive E2E runner |
| `npm run prepare` | Setup git hooks |

## Support & Resources

- **Vitest**: https://vitest.dev/api
- **Playwright**: https://playwright.dev/docs/intro
- **Testing Library**: https://testing-library.com/react
- **Husky**: https://typicode.github.io/husky
- **Jira API**: https://developer.atlassian.com/cloud/jira/rest

---

**Questions?** Check `AUTOMATION_SETUP.md` for detailed documentation.
