module.exports.src =
`{
  "name": "project_name",
  "version": "1.0.0",
  "description": "",
  "main": "easy-electron.js",
  "scripts": {
    "babel": "babel",
    "run-babel": "babel main.js --out-dir build && babel ./src --out-dir build/src",
    "run-webpack": "webpack",
    "build": "npm run run-babel && npm run run-webpack",
    "start": "npm run build && electron ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}`