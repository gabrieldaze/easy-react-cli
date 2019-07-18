module.exports.src =
`const { app, BrowserWindow } = require('electron');
const { resolve } = require("path");
const { watch } = require("fs");
const { execSync } = require("child_process");

const Socket = require('socket.io');

const reloadServer = Socket();
let clientSocket = null;
let reloadInterval = null;

const buildFolder = resolve(__dirname, "build");
const publicFolder = resolve(__dirname, "public");
const sourceFolder = resolve(__dirname, "src");

const decorate = {
  black: (text) => {
    return "\\x1b[30m" + text + "\\x1b[0m";
  },
  red: (text) => {
    return "\\x1b[31m" + text + "\\x1b[0m";
  },
  green: (text) => {
    return "\\x1b[32m" + text + "\\x1b[0m";
  },
  yellow: (text) => {
    return "\\x1b[33m" + text + "\\x1b[0m";
  },
  blue: (text) => {
    return "\\x1b[34m" + text + "\\x1b[0m";
  },
  magenta: (text) => {
    return "\\x1b[35m" + text + "\\x1b[0m";
  },
  cyan: (text) => {
    return "\\x1b[36m" + text + "\\x1b[0m";
  },
  white: (text) => {
    return "\\x1b[37m" + text + "\\x1b[0m";
  }
};

const buildApplication = () => {
  try {
    console.clear();
    console.log(decorate.cyan("Building application"));
    execSync("npm run build", { encoding: "utf8" });
    console.log("Application built", decorate.green("successfuly"), "\\n");
  } catch (exception) {
    console.error(decorate.red("Failed to build application"), exception);
  }
}

const fileGuard = [];

const rebuildApplication = (filename = "") => {
  if (!fileGuard[filename]) {
    fileGuard[filename] = setTimeout(() => { fileGuard[filename] = null }, 10000);
    try {
      const lastSlash = filename.lastIndexOf("/");
      const outputDir = lastSlash > -1 ? filename.slice(0, lastSlash) : "";
      console.log("Detected changes on", decorate.cyan(filename));
      execSync(\`npm run babel -- \${sourceFolder}/\${filename} --out-dir \${buildFolder}/src/\${outputDir}\`, { encoding: "utf8" });
      console.log(filename, decorate.green("built successfuly"));
      execSync("npm run run-webpack", { encoding: "utf8" });
      console.log("Application rebuilt", decorate.green("successfuly"), "\\n");
      clearInterval(reloadInterval);
      clientSocket.emit("refresh");
    } catch (exception) {
      console.error(decorate.red("Failed to rebuild application"), exception);
    }
  }
}

reloadServer.on("connection", socket => {
  console.log("Client connected", decorate.green("successfuly"));
  clientSocket = socket;
  clientSocket.emit("connected");
  reloadInterval = setInterval(() => { if (!socket.connected) clientSocket = null }, 500);
});

const buildWindow = window => {
  const createWindow = () => {
    window = new BrowserWindow({
      width: 800,
      height: 600
    });

    window.loadFile(\`\${publicFolder}/index.html\`);
    window.on("closed", () => window = null);
  }

  app.on("ready", createWindow);

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });

  app.on("activate", () => {
    if (window === null) createWindow();
  });
}

let appWindow;

const initialize = async () => {
  buildApplication();
  watch(sourceFolder, { recursive: true }, (event, filename) => rebuildApplication(filename));
  buildWindow(appWindow);
  reloadServer.listen(2404);
}

initialize();
`