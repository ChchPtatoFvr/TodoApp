import React, { Component } from 'react';
import default_export from '@src/logic/utils/default_export.js';


function DynamicImport(options)
{

  if (!options.loader) {
    throw Error("Loader must be specified");
  }

  var module = null;
  var loading = false;
  var promise = null;

  function load()
  {
    if (module)
    {
      return Promise.resolve(module);
    }
    else
    {
      if (!loading)
      {
        loading = true;
        promise = options.loader();
      }

      return promise
        .then(res => {
          module = default_export(res);
          return module;
        });
    }
  }

  if (options.preload)
  {
    load(options.loader)
      .catch(err => {}); // Do nothing
  }


  return class LoadableComponent extends Component {
    constructor(props) {
      super(props)

      this.loader     = undefined;
      this.loading    = undefined;
      this.render_fn  = undefined;
      this.timeout    = undefined;
      this.delay      = undefined;

      if (options.loader) {
        this.loader = options.loader;
      }
      else {
        throw Error("Loader must be specified");
      }

      if (options.loading) {
        this.loading = options.loading
      }
      else {
        this.loading = null;
      }

      if (options.render) {
        this.render_fn = options.render;
      }
      else {
        this.render_fn = (module) => {
          const Loaded = default_export(module);
          return <Loaded/>;
        };
      }

      if (options.timeout) {
        this.timeout = options.timeout;
      }
      else {
        this.timeout = null;
      }

      if (options.delay) {
        this.delay = options.delay;
      }
      else {
        this.delay = 200;
      }

      this.state = {
        component: null
      }
    }

    componentDidMount()
    {
      if (this.delay)
      {
        this.delay_id = setTimeout(() => {
          const Loading = this.loading;
          this.setState({
            component: <Loading/>
          })
        }, this.delay);
      }

      if (this.timeout)
      {
        this.timeout_id = setTimeout(() => {
          const Loading = this.loading;
          this.setState({
            component: <Loading error="Timed out"/>
          })
        }, this.timeout);
      }

      load()
        .then(module => {
          this._clear_timers();

          this.setState({
            component: this.render_fn(module)
          })
        })
    }

    _clear_timers()
    {
      if (this.delay_id) {
        clearTimeout(this.delay_id);
      }

      if (this.timeout_id) {
        clearTimeout(this.timeout_id);
      }
    }

    componentWillUnmount()
    {
      this._clear_timers();
    }

    render()
    {
      return this.state.component;
    }
  }
}



export default DynamicImport;
