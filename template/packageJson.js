module.exports.src =
`
{
  "name": "project-name",
  "description": "My EasyReact application",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "repository": {},
  "scripts": {
    "start": "webpack serve --mode=development --config=webpack.config.js",
    "build:dev": "webpack --mode=development --config=webpack.config.js",
    "build:prd": "webpack --mode=production --config=webpack.config.js"
  },
  "dependencies": {
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "styled-components": "^5.2.1"
  },
  "devDependencies": {
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.10",
    "@babel/preset-react": "^7.12.10",
    "@types/node": "^14.14.12",
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0",
    "babel-loader": "^8.2.2",
    "ts-loader": "^8.0.12",
    "typescript": "^4.1.3",
    "webpack": "^5.10.0",
    "webpack-cli": "^4.2.0",
    "webpack-dev-server": "^3.11.0"
  }
}
`;
