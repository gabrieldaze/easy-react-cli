# EasyReact CLI

#### EasyReact CLI is a tool for creating react applications. It uses a simple template and add the dependencies necessary to develop a react app.

#### It comes with a custom server, so you can develop your application and control how it is going to be served. You can obviously rewrite the development server.

## Usage

To create your applications, simply run
```shell
easy-react project-name
```
It will create a folder containing the files you need to start to write your application. Now you can enter the folder that has just been created and run
```shell
npm run start
```

## Composition

#### Now you'll see the template's composition
- ***package.json***: Contains information about your project, including its dependencies
- ***.babelrc***: Minimal configuration necessary to babeljs
- ***webpack.config.js***: Minimal configuration necessary to webpack
- ***main.js***: The startpoint of your application. Contains the code needed to attach the react application to a page
- ***easy-server.js***: The custom development server that serves the content in the **public** folder
- ***public***: Folder containing your application. The content inside this folder is ready to deploy.
- ***src***: Contains a file named **index.jsx** that holds the Root component for the application. That is entirely customizable.

## Plans for the future

- Optimization options as command flags
- A better initial root component