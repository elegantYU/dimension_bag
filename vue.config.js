const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      filename: "index.html",
      title: "弹出页面"
    },
    background: {
      entry: "chrome/background/main.js",
      filename: "background.html",
      title: "背景页"
    }
  },
  assetsDir: "static",
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: "static/manifest.json",
          to: "manifest.json",
          toType: "file",
          cache: true
        },
        {
          from: path.resolve(__dirname, "static/icon"),
          to: path.resolve(__dirname, "dist/static/icon"),
          cache: true
        }
      ])
    ]
  }
};
