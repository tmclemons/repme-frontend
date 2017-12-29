import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import TableComponent from '../components/tableComponent/TableComponent'

const UiTemplateMain = () => (
  <MuiThemeProvider>
    <TableComponent />
  </MuiThemeProvider>
);

export default UiTemplateMain;