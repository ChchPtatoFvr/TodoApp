import default_export from '@src/logic/utils/default_export.js';


// Possible spinner states
const delayed  = "delayed";
const spinning = "spinning";
const done     = "done";

// Duration in milliseconds
const spinner_delay = 250;
const spinner_minimum_duration = 250;

var status = delayed;
var spinning_started = null;

setTimeout(() => {
  // Start loading asynchronously
  const loading_module = import('@src/app.jsx');

  const spinner_delay_timeout = setTimeout(() => {
    status = spinning;
    spinning_started = Date.now();
    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";
  }, spinner_delay);

  loading_module
    .then(module => {

      if (status == delayed)
      {
        status = done;
        clearTimeout(spinner_delay_timeout);
        return module;
      }
      else if (status == spinning)
      {
        return new Promise((resolve, reject) => {
          const time_loaded = Date.now();
          const spinning_duration = time_loaded - spinning_started;

          if (spinning_duration >= spinner_minimum_duration) {
            status = done;
            resolve(module);
          }
          else {
            const spinner_duration_remaining = spinner_minimum_duration - spinning_duration;
            setTimeout(() => {
              status = done;
              resolve(module)
            }, spinner_duration_remaining);
          }
        });
      }
      else
      {
        return module;
      }
    })
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

}, 0);

// start fetching

// if after n milliseconds and not yet loaded: display spinner
  // wait minimum of m milliseconds before removing spinner
  // run loaded module

// run loaded module
