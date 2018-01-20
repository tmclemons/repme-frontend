import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, browserHistory } from 'react-router-dom';
import AsyncComponent from "./template/components/utilities/AsyncComponent";
import Routing from './app/routing';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';

const CircularProgressExampleSimple = () => (
  <MuiThemeProvider>
    <div id="loading-spinner"
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100vw',
        zIndex: '10000',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
      }}
      >
      <CircularProgress
        color={'rgb(0, 76, 135)'} 
        size={120} 
        thickness={8} 
      />
    </div>
  </MuiThemeProvider>
);

//routes
render(
  <div>
    <CircularProgressExampleSimple />
    <BrowserRouter history={browserHistory}>
      <Routing />
    </BrowserRouter>
  </div>,
  document.getElementById('repme-app')
)