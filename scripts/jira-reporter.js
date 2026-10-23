#!/usr/bin/env node
/**
 * Jira Reporter - Uploads E2E test results to Jira
 * Reads from playwright-report/results.json and appends to Jira ticket
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const JIRA_HOST = process.env.JIRA_HOST || 'your-instance.atlassian.net';
const JIRA_USER = process.env.JIRA_USER;
const JIRA_TOKEN = process.env.JIRA_TOKEN;
const JIRA_ISSUE_KEY = process.env.JIRA_ISSUE_KEY || extractIssueKeyFromGit();

// Extract Jira issue key from git branch or PR description
function extractIssueKeyFromGit() {
  try {
    const branchName = require('child_process')
      .execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim();
    const match = branchName.match(/([A-Z]+-\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

async function reportToJira() {
  if (!JIRA_ISSUE_KEY) {
    console.log('⚠️  No Jira issue key found. Skipping Jira report.');
    return;
  }

  if (!JIRA_USER || !JIRA_TOKEN) {
    console.log('⚠️  Jira credentials not configured. Skipping Jira report.');
    console.log('   Set JIRA_HOST, JIRA_USER, and JIRA_TOKEN environment variables.');
    return;
  }

  try {
    const resultsFile = path.join(process.cwd(), 'playwright-report', 'results.json');

    if (!fs.existsSync(resultsFile)) {
      console.log('⚠️  No E2E test results found.');
      return;
    }

    const results = JSON.parse(fs.readFileSync(resultsFile, 'utf-8'));
    const summary = generateTestSummary(results);

    console.log(`📊 Reporting E2E test results to ${JIRA_ISSUE_KEY}...`);
    await updateJiraIssue(JIRA_ISSUE_KEY, summary);
    console.log('✅ Jira issue updated successfully!');
  } catch (error) {
    console.error('❌ Failed to report to Jira:', error.message);
    process.exit(1);
  }
}

function generateTestSummary(results) {
  const stats = results.stats || {};
  const suites = results.suites || [];

  const passed = stats.expected || 0;
  const failed = stats.unexpected || 0;
  const skipped = stats.skipped || 0;
  const total = passed + failed + skipped;

  const timestamp = new Date().toISOString();
  const gitCommit = getGitCommit();
  const gitBranch = getGitBranch();

  let summary = `h3. E2E Test Report\n`;
  summary += `*Timestamp:* ${timestamp}\n`;
  summary += `*Branch:* ${gitBranch}\n`;
  summary += `*Commit:* ${gitCommit}\n\n`;

  summary += `||Metric||Value||\n`;
  summary += `|Total Tests|${total}|\n`;
  summary += `|✅ Passed|${passed}|\n`;
  summary += `|❌ Failed|${failed}|\n`;
  summary += `|⏭️ Skipped|${skipped}|\n`;
  summary += `|Success Rate|${total > 0 ? ((passed / total) * 100).toFixed(2) + '%' : 'N/A'}|\n\n`;

  // Add failed tests details
  if (failed > 0) {
    summary += `h4. Failed Tests\n`;
    suites.forEach((suite) => {
      suite.tests?.forEach((test) => {
        if (test.status === 'failed') {
          summary += `* ${test.title}\n`;
          if (test.error) {
            summary += `  {code}${test.error.message}{code}\n`;
          }
        }
      });
    });
  }

  summary += `\n[View Full Report|${process.env.CI_ARTIFACTS_URL || 'playwright-report/index.html'}]\n`;

  return summary;
}

function getGitCommit() {
  try {
    return require('child_process')
      .execSync('git rev-parse HEAD')
      .toString()
      .trim()
      .substring(0, 7);
  } catch {
    return 'unknown';
  }
}

function getGitBranch() {
  try {
    return require('child_process')
      .execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim();
  } catch {
    return 'unknown';
  }
}

async function updateJiraIssue(issueKey, comment) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${JIRA_USER}:${JIRA_TOKEN}`).toString('base64');

    const payload = JSON.stringify({
      body: {
        version: 3,
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: comment,
              },
            ],
          },
        ],
      },
    });

    const options = {
      hostname: JIRA_HOST,
      port: 443,
      path: `/rest/api/3/issue/${issueKey}/comments`,
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Jira API error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

reportToJira().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
