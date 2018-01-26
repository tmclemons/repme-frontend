
import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

import routes from './routes';

const CircularProgressExampleSimple = () => (
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
);


const AppWrapper = () => {
  return (
    <div>
      <CircularProgressExampleSimple />
      <div id='app-wrapper' style={{ display: 'inherit' }}>
          {renderRoutes(routes)}
      </div>
    </div>
  )
}

const AppRouter = () => {
  return (
    <MuiThemeProvider>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

console.log("render started")
if (typeof window !== "undefined") {
  render(
    <AppRouter />,
    document.getElementById('repme-app')
  )
}

export default AppWrapper;