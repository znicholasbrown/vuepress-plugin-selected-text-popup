const { path } = require("@vuepress/shared-utils");

module.exports = (options = {}, ctx) => ({
  define: {},
  globalUIComponents: ["selectTextPopup"],
  enhanceAppFiles: [path.resolve(__dirname, "appLevelEnhancement.js")],
  clientRootMixin: path.resolve(__dirname, "clientRootMixin.js")
});
