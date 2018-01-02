import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import AsyncComponent from "./template/components/utilities/AsyncComponent";
// import App from './app/admin/bills/bills'
import Login from './app/public/login/login'

//routes
const Bills = AsyncComponent(
  () => import('./app/admin/bills/bills')
)

render(
  <BrowserRouter>
    <Login />
  </BrowserRouter>,
  document.getElementById('app')
)