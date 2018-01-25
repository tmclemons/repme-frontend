import React from "react";
import { render } from "react-dom";
import routes from './routing';

render( routes, () => {
  console.log('Completed Rendering!');
})

if (module.hot) {
  module.hot.accept('./routing', () => {
    //reload routes again
    require('./routing').default;
    render(routes)
  });
};