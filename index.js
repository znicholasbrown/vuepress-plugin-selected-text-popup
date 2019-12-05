const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, ctx) => ({
  define: {
    GITHUB: options.github || true,
    GITHUB_OWNER: options.githubOwner || '',
    GITHUB_REPO: options.githubRepo || '',
    GITHUB_ISSUE_TITLE: options.githubIssueTitle || '',
    GITHUB_LABELS: options.labels || [],
    TWITTER: options.twitter || true
  },
  globalUIComponents: ['selectedTextPopup'],
  enhanceAppFiles: [path.resolve(__dirname, 'appLevelEnhancement.js')],
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
})
