import React, { useState } from 'react';
import ReactDOM from 'react-dom';


function App()
{
  return (<p style={{ color: "#fff" }}> Hello World! </p>);
}

export default function start()
{
  const root = document.getElementById("root");
  ReactDOM.render(<App />, root);
}
