import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 
  'material-ui/svg-icons/navigation/menu';

class UiTemplateHeader extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          title="Title"
          iconElementLeft={
            <IconButton>
              <NavigationMenu onClick={this.props.callback}/>
            </IconButton>
          }
        />
      </MuiThemeProvider>
    )
  }
}

export default UiTemplateHeader;