module.exports.src =
`import React from 'react';

const RootStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "sans-serif",
  fontWeight: "300",
  fontSize: "24px"
}

const App = () => {
  return (
    <div style={RootStyle}>
      Easy React Application
    </div>
  );
};

export default App;
`