# Vuepress Selected Text Popup Plugin

A global plugin for Vuepress that creates a popup on selecting text!

It currently supports options to link to (and autopopulate with selection) a GitHub issue and Tweet.

## Installation

```
$ npm install vuepress-plugin-selected-text-popup
# OR
$ yarn add vuepress-plugin-selected-text-popup
```

## Usage

The plugin can be added to `.vuepress/config.js` in your Vuepress project under `plugins`:

```javascript
module.exports = {
  plugins: [['vuepress-plugin-selected-text-popup', true]]
}
```

## Options

The plugin takes a number of options, which can be passed in with the plugin config in an options object:

GITHUB: options.github || true,
GITHUB_OWNER: options.githubOwner || '',
GITHUB_REPO: options.githubRepo || '',
GITHUB_ISSUE_TITLE: options.githubIssueTitle || '',
GITHUB_LABELS: options.githubLabels || [],
GITHUB_TOOLTIP_CONTENT:
options.githubTooltipContent || 'Create a GitHub Issue!',
TWITTER: options.twitter || true

```
module.exports = {
  plugins: [
    ["vuepress-plugin-selected-text-popup", {
        github: Boolean,
        twitter: Boolean,
        githubOwner: String,
        githubRepo: String,
        githubIssueTitle: String,
        githubLabels: String[],
        githubTooltipContent: String
  ]
}
```

### github

- Type: `Boolean`
- Default: `true`

Enables the GitHub issue creation link.
`githubOwner` and `githubRepo` options should both be set if this is `true`.

### twitter

- Type: `Boolean`
- Default: `true`

Enables the Tweet creation link.

### githubOwner

- Type: `String`
- Default: ``

The owner of the repository the GitHub issue will link to.

### githubRepo

- Type: `String`
- Default: ``

The GitHub repository the issue will link to.

### githubIssueTitle

- Type: `String`
- Default: ``

The title of the GitHub issue to be created.

### githubLabels

- Type: `String[]`
- Default: `[]`

This is an array of strings representing labels for the issue to be created. (these are case sensitive)

### githubTooltipContent

- Type: `String`
- Default: `Create a GitHub Issue!`

This sets the text that displays when a user hovers the GitHub link
