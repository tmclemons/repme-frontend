import React from "react";
import { render } from "react-dom";
import RoutingInit from "./app/routing.js";

const Routing = RoutingInit();

render(
  Routing,
  document.getElementById('app')
);