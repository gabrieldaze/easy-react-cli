#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const utils = require("./utils");

const appType = {
  react: {
    devDependencies: ["@babel/cli", "@babel/core", "@babel/preset-env", "@babel/preset-react", "react", "react-dom", "webpack", "webpack-cli"],
    templateFiles: {
      ".babelrc": require("../template/babelrc").src,
      "package.json": require("../template/packageJson").src,
      "webpack.config.js": require("../template/webpackConfig").src,
      "easy-server.js": require("../template/easy-server").src,
      "main.js": require("../template/main").src,
      "src/root.jsx": require("../template/src/root").src,
      "public/index.html": require("../template/public/indexHtml").src
    }
  },
  electron: {
    devDependencies: ["@babel/cli", "@babel/core", "@babel/preset-env", "@babel/preset-react", "react", "react-dom", "webpack", "webpack-cli", "electron", "socket.io"],
    templateFiles: {
      ".babelrc": require("../template/babelrc").src,
      "package.json": require("../template/packageElectron").src,
      "webpack.config.js": require("../template/webpackConfig").src,
      "easy-electron.js": require("../template/easy-electron").src,
      "main.js": require("../template/mainElectron").src,
      "src/root.jsx": require("../template/src/root").src,
      "public/index.html": require("../template/public/indexHtmlElectron").src
    }
  }
}

function copyTemplate(projectName, pathName, type) {
  for (let key in appType[type].templateFiles) {
    if (key === "package.json") {
      fs.writeFileSync(`${pathName}/${key}`, appType[type].templateFiles[key].replace("project_name", projectName.toLowerCase()), { encoding: "utf8" });
    } else {
      fs.writeFileSync(`${pathName}/${key}`, appType[type].templateFiles[key], { encoding: "utf8" });
    }
  }
}

function create(args = []) {
  if (args.length < 3) {
    console.log(utils.decorate.red("Error"), "Missing one argument");
    console.log("Usage: easy-react", utils.decorate.cyan("[project name]"));
    return;
  }

  const type = args[3] === "--electron" ? "electron" : "react";

  const projectName = args[2];
  const pathName = path.resolve(`./${projectName}`);
  if (fs.existsSync(pathName)) {
    console.log(utils.decorate.red("Error"), "A folder with the name of your project already exists");
    return;
  }

  console.log("Creating the project", utils.decorate.cyan(projectName));
  fs.mkdirSync(pathName);
  fs.mkdirSync(`${pathName}/src`);
  fs.mkdirSync(`${pathName}/public`);

  copyTemplate(projectName, pathName, type);

  console.log("Adding development dependencies.", utils.decorate.yellow("This may take a while..."));
  const slowInternet = setTimeout(() => { console.log("This process is taking a while. It may be caused by a slow internet connection.") }, 25000);
  childProcess.execSync(`cd ${pathName} && npm install --save-dev ${appType[type].devDependencies.join(" ")}`)
  clearTimeout(slowInternet);

  console.log("Your application has been created", utils.decorate.green("successfuly"));
  console.log("Now you can run", utils.decorate.cyan("npm run start"), "inside your application folder");
}

create(process.argv);