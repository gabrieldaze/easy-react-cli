module.exports.src =
`
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RootApplication } from "./root";

const rootContainer = document.querySelector('#easy-react');
if (rootContainer) { ReactDOM.render(<RootApplication />, rootContainer) }
`;