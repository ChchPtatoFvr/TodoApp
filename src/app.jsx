import React, { useState } from 'react';
import ReactDOM from 'react-dom';


function App()
{
  return (<div> Hello World! </div>);
}

export default function start()
{
  const root = document.getElementById("root");
  ReactDOM.render(<App />, root);
}
