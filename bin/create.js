#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const utils = require("./utils");

const appType = {
  react: {
    dependencies: [
      "react",
      "react-dom",
      "styled-components"
    ],
    devDependencies: [
      "@babel/core",
      "@babel/preset-env",
      "@babel/preset-react",
      "@types/node",
      "@types/react",
      "@types/react-dom",
      "babel-loader",
      "ts-loader",
      "typescript",
      "webpack",
      "webpack-cli",
      "webpack-dev-server",
    ],
    templateFiles: {
      ".babelrc": require("../template/babelrc").src,
      "package.json": require("../template/packageJson").src,
      "tsconfig.json": require("../template/tsconfigJson").src,
      "webpack.config.js": require("../template/webpackConfig").src,
      "dist/index.html": require("../template/dist/indexHtml").src,
      "src/index.tsx": require("../template/src/indexTsx").src,
      "src/root.tsx": require("../template/src/rootTsx").src,
      "src/root.styles.tsx": require("../template/src/rootStylesTsx").src,
      "src/components/Description/description.tsx": require("../template/src/components/Description/descriptionTsx").src,
      "src/components/Description/description.styles.tsx": require("../template/src/components/Description/descriptionStylesTsx").src,
      "src/components/Header/header.tsx": require("../template/src/components/Header/headerTsx").src,
      "src/components/Header/header.styles.tsx": require("../template/src/components/Header/headerStylesTsx").src,
    }
  },
}

function copyTemplate(projectName, pathName, type) {
  for (let key in appType[type].templateFiles) {
    if (key === "package.json") {
      fs.writeFileSync(`${pathName}/${key}`, appType[type].templateFiles[key].replace("project-name", projectName.toLowerCase()), { encoding: "utf8" });
    } else {
      fs.writeFileSync(`${pathName}/${key}`, appType[type].templateFiles[key], { encoding: "utf8" });
    }
  }
}

function create(args = []) {
  if (args.length < 3) {
    process.stderr.write(`${utils.decorate.red("Error")}: Missing one argument\n`);
    process.stdout.write(`Usage: easy-react ${utils.decorate.cyan("[project name]")}\n`);
    return;
  }

  // const type = args[3] === "--electron" ? "electron" : "react";

  const projectName = args[2];
  const pathName = path.resolve(`./${projectName}`);
  if (fs.existsSync(pathName)) {
    process.stderr.write(`${utils.decorate.red("Error")}: A folder with the name ${utils.decorate.yellow(projectName)} project already exists\n`);
    return;
  }

  process.stdout.write(`Creating the project ${utils.decorate.cyan(projectName)}\n`);
  fs.mkdirSync(pathName);
  fs.mkdirSync(`${pathName}/src`);
  fs.mkdirSync(`${pathName}/src/components`);
  fs.mkdirSync(`${pathName}/src/components/Description`);
  fs.mkdirSync(`${pathName}/src/components/Header`);
  fs.mkdirSync(`${pathName}/src/pages`);
  fs.mkdirSync(`${pathName}/dist`);

  copyTemplate(projectName, pathName, 'react');

  process.stdout.write(`Adding project dependencies. ${utils.decorate.yellow("This may take a while...")}\n`);
  const pDepsSlowInternet = setTimeout(() => { process.stdout.write("This process is taking a while. It may be caused by a slow internet connection.\n") }, 25000);
  childProcess.execSync(`cd ${pathName} && npm install ${appType['react'].dependencies.join(" ")}`);
  clearTimeout(pDepsSlowInternet);

  process.stdout.write(`Adding development dependencies. ${utils.decorate.yellow("This may take a while...")}\n`);
  const dDepsSlowInternet = setTimeout(() => { process.stdout.write("This process is taking a while. It may be caused by a slow internet connection.\n") }, 25000);
  childProcess.execSync(`cd ${pathName} && npm install --save-dev ${appType['react'].devDependencies.join(" ")}`)
  clearTimeout(dDepsSlowInternet);

  process.stdout.write(`Your application has been created ${utils.decorate.green("successfully")}\n`);
  process.stdout.write(`Now you can run ${utils.decorate.cyan("npm run start")} inside your application folder\n`);
}

create(process.argv);