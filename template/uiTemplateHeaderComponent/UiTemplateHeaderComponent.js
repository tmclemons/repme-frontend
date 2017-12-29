import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

const UiTemplateHeader = () => (
  <MuiThemeProvider>
    <AppBar
      title="Title"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
  </MuiThemeProvider>
);

export default UiTemplateHeader;