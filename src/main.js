import default_export from '@src/logic/utils/default_export.js';


import('@src/app.jsx')
  .then(module => {
    const start = default_export(module);
    start();
  })
  .catch(err => {
    // TODO better error handling

    const root = document.getElementById("root");
    const error = document.createElement("h3");
    const message = document.createTextNode(JSON.stringify(err));

    error.appendChild(message);
    root.prepend(error);
  })
