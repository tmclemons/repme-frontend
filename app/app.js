
import React from 'react';
import { render } from 'react-dom';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
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


const AppRouter = () => {
  return (
    <MuiThemeProvider>
      <div>
        <CircularProgressExampleSimple />
        <div id='app-wrapper' style={{ display: 'inherit' }}>
          <BrowserRouter>
            {renderRoutes(routes)}
          </BrowserRouter>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

if (typeof window !== "undefined") {
  render(
    <AppRouter />,
    document.querySelector('#repme-app')
  )
}