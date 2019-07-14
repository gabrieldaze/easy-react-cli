module.exports.src =
`const { resolve } = require("path");

const babelOutputPath = resolve(__dirname, "build");
const webpackOutputPath = resolve(__dirname, "public");

module.exports = {
  mode: "production",
  entry: babelOutputPath + "/main.js",
  output: {
    filename: "main.js",
    path: webpackOutputPath
  }
};`