import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';

//figure out way to more configurable load components
import SideComponentCard from "./components/sideComponentCard/SideComponentCard";
import SideComponentNav from "./components/sideComponentNav/SideComponentNav";

const UiTemplateSide = () => (
  <MuiThemeProvider>
    <Drawer width={300}>
      <SideComponentCard />
      <SideComponentNav />
    </Drawer>
  </MuiThemeProvider>
);

export default UiTemplateSide;