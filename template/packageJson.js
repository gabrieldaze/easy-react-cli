module.exports.src =
`{
  "name": "project_name",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "babel": "babel",
    "run-babel": "babel main.js --out-dir build && babel ./src --out-dir build/src",
    "run-webpack": "webpack",
    "build": "npm run run-babel && npm run run-webpack",
    "start": "node easy-server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}`