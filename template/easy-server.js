module.exports.src =
`const { createServer } = require("http");
const { resolve } = require("path");
const { readFileSync, watch } = require("fs");
const { execSync } = require("child_process");

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

const parseContentType = (requestUrl = "/") => {
  if (requestUrl === "/" || requestUrl.endsWith(".html")) return "text/html; charset=UTF-8";
  if (requestUrl.endsWith(".js")) return "text/javascript";
  return "text/plain";
}

const requestListener = (request, response) => {
  if (request.url.endsWith("favicon.ico")) {
    response.end();
  } else {
    const fileName = request.url === "/" ? "/index.html" : request.url;
    const fileData = readFileSync(publicFolder + fileName, { encoding: "utf8" });
    response.setHeader("Content-Type", parseContentType(request.url));
    response.end(fileData);
  }
}

const initialApplication = () => {
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
    fileGuard[filename] = setTimeout(() => { fileGuard[filename] = null }, 3000);
    try {
      const lastSlash = filename.lastIndexOf("/");
      const outputDir = lastSlash > -1 ? filename.slice(0, lastSlash) : "";
      console.log("Detected changes on", decorate.cyan(filename));
      execSync(\`npm run babel -- \${sourceFolder}/\${filename} --out-dir \${buildFolder}/src/\${outputDir}\`, { encoding: "utf8" });
      console.log(filename, decorate.green("built successfuly"));
      execSync("npm run run-webpack", { encoding: "utf8" });
      console.log("Application rebuilt", decorate.green("successfuly"), "\\n");
    } catch (exception) {
      console.error(decorate.red("Failed to rebuild application"), exception);
    }
  }
}

const initialize = async (server = createServer()) => {
  initialApplication();
  server.listen(8080, () => console.log("Server now listening on port", decorate.cyan("8080"), "\\n"));
  watch(sourceFolder, { recursive: true }, (event, filename) => rebuildApplication(filename));
}

const server = createServer(requestListener);

initialize(server);`