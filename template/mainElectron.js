module.exports.src =
`import React from 'react';
import ReactDOM from 'react-dom';
import Root from './src/root';

const client = io.connect("http://localhost:2404");
client.on("connected", () => console.log("Connected successfuly"));
client.on("refresh", () => {
  console.log("Refreshing...");
  window.location.reload()
});

const rootNode = document.getElementById("easy-react");
ReactDOM.render(<Root />, rootNode);
`