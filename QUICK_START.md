# ⚡ Quick Start - 5 Minutes

## Step 1: Install & Setup (2 min)

```bash
npm install
npm run prepare
```

## Step 2: Verify Locally (2 min)

```bash
npm run lint      # ✅ Should pass
npm run test      # ✅ Should pass
```

## Step 3: Run E2E Tests (3 min)

Terminal 1:
```bash
npm run dev
```

Terminal 2:
```bash
npm run test:e2e
```

## Step 4: Push to GitHub (1 min)

```bash
git add .
git commit -m "feat: setup automated testing pipeline"
git push origin main
```

✅ Done! Watch your GitHub Actions automatically run tests.

---

## What Just Happened?

✅ **Pre-commit hooks** - Automatically lint & test before each commit  
✅ **Unit tests** - Vitest framework for component testing  
✅ **E2E tests** - Playwright tests across 3 browsers  
✅ **GitHub Actions** - CI/CD pipeline that runs tests on every push  
✅ **Jira integration** - Automatic test results posted to Jira tickets  

## View Results

1. **GitHub Actions**: GitHub → Actions → test.yml
2. **Playwright Report**: Actions → Artifacts → playwright-report.zip
3. **Jira Ticket**: Check comment section (if configured)

## Next: Configure Jira (Optional)

Add GitHub Secrets:
- `JIRA_HOST` = your-org.atlassian.net
- `JIRA_USER` = your@email.com
- `JIRA_TOKEN` = [Get from account.atlassian.com]

## Verify Everything Works

After push completes:
1. GitHub Actions should show ✅
2. Check `Actions` tab for "Test & Quality Checks"
3. Both phases should complete:
   - Lint & Unit Tests
   - E2E Tests

## Common Commands

```bash
npm run lint            # Check code style
npm run test            # Run tests
npm run test:coverage   # Coverage report
npm run test:e2e        # E2E tests
npm run test:e2e:ui     # Interactive mode
npm run dev             # Dev server
npm run build           # Production build
```

---

**For detailed setup**: Read `SETUP_INSTRUCTIONS.md`  
**For full documentation**: Read `AUTOMATION_SETUP.md`  
**For overview**: Read `AUTOMATION_OVERVIEW.md`
