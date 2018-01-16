import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom';
import AsyncComponent from "./template/components/utilities/AsyncComponent";
import Routing from './app/routing';

//routes
render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>,
  document.getElementById('repme-app')
)