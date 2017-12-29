import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';
import Scss from "./uiTemplateSide.scss";
import SideComponentCard from 
  "../components/sideComponentCard/SideComponentCard";
import SideComponentNav from 
  "../components/sideComponentNav/SideComponentNav";

const UiTemplateSide = () => (
  <MuiThemeProvider>
    <Drawer containerClassName="uitemplate__sidecomponent">
      <SideComponentCard />
      <SideComponentNav />
    </Drawer>
  </MuiThemeProvider>
);

export default UiTemplateSide;