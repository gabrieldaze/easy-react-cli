# EasyReact CLI

**EasyReact CLI is a tool for creating React applications. It uses a simple template, and the minimum dependencies necessary to run a new application.**

## Usage

To create your applications, simply run
```shell
easy-react project-name
```
It will create a folder containing the files you need to start to write your application. Now you can enter the folder and run
```shell
npm run start
```

## Composition

- ***package.json***: Contains information about your project, including its dependencies
- ***.babelrc***: Minimal configuration necessary to babeljs
- ***webpack.config.js***: Minimal configuration necessary to webpack
- ***dist/***: Folder containing your deployable application. The content inside this folder is ready to deploy.
- ***src/***: Folder containing your source code. There is a template code using TypeScript by default, but you can simply change the files' extensions to **.jsx** or just **.js**.

## Changelog
- Removed easy-server
- Removed Electron support (It will be added back later)
- Added TypeScript by default
- Added Styled Components by default

## Plans for the future

- Add Electron support to the CLI by using the `--electron` flag