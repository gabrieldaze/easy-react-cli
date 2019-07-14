#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const utils = require("./utils");

function create(args = []) {
  if (args.length < 3) {
    console.log(utils.decorate.red("Error"), "Missing one argument");
    console.log("Usage: easy-react", utils.decorate.cyan("[project name]"));
    return;
  }

  const projectName = args[2];
  const pathName = path.resolve(`./${projectName}`);
  if (fs.existsSync(pathName)) {
    console.log(utils.decorate.red("Error"), "A folder with the name of your project already exists");
    return;
  }

  console.log("Creating the project", utils.decorate.cyan(projectName));
  fs.mkdirSync(pathName);

  const templateFolder = "./template";
  const packageJson = fs.readFileSync(`${templateFolder}/package.json`, { encoding: "utf8" });
  fs.writeFileSync(`${pathName}/package.json`, packageJson.replace("project_name", projectName.toLowerCase()));

  /**
   * "@babel/cli",
   * "@babel/core",
   * "@babel/preset-env",
   * "@babel/preset-react",
   * "react",
   * "webpack",
   * "webpack-cli"
   */
  console.log("Adding development dependencies.", utils.decorate.yellow("This may take a while..."));
  const slowInternet = setTimeout(() => { console.log("This process is taking a while. It may be caused by a slow internet connection.") }, 25000);
  const devDependencies = ["@babel/cli", "@babel/core", "@babel/preset-env", "@babel/preset-react", "react", "webpack", "webpack-cli"]
  childProcess.execSync(`cd ${pathName} && npm install --save-dev ${devDependencies.join(" ")}`)
  clearTimeout(slowInternet);

  console.log("Adding configuration files.", utils.decorate.yellow("Please, wait just a little more..."));

  // Adding .babelrc
  fs.copyFileSync(`${templateFolder}/.babelrc`, `${pathName}/.babelrc`);

  // Adding webpack.config.js
  fs.copyFileSync(`${templateFolder}/webpack.config.js`, `${pathName}/webpack.config.js`);

  // Adding main.js
  fs.copyFileSync(`${templateFolder}/main.js`, `${pathName}/main.js`);

  // Adding easy-server.js
  fs.copyFileSync(`${templateFolder}/easy-server.js`, `${pathName}/easy-server.js`);

  // Adding src/index.js
  fs.mkdirSync(`${pathName}/src`);
  fs.copyFileSync(`${templateFolder}/src/index.jsx`, `${pathName}/src/index.jsx`);

  // Adding public index.html
  fs.mkdirSync(`${pathName}/public`);
  fs.copyFileSync(`${templateFolder}/public/index.html`, `${pathName}/public/index.html`);

  console.log("Your application has been created", utils.decorate.green("successfuly"));
  console.log("Now you can run", utils.decorate.cyan("npm run start"), "inside your application folder");
}

create(process.argv);