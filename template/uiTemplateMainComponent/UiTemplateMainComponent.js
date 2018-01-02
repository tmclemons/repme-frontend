import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import TableComponent from '../components/tableComponent/TableComponent'

class UiTemplateMain extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <MuiThemeProvider>
        <TableComponent data={this.props.data}/>
      </MuiThemeProvider>
    )
  }
}

export default UiTemplateMain;