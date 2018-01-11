import React from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import RepMeLogo from '../../../../../template/components/utilities/logoComponent';
import classNames from 'classnames';
import Scss from './header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div style={{background: 'black'}}>
          <Link style={{margin: '0 20px', color: 'white'}} to="/vote">Votes</Link>
          <Link style={{margin: '0 20px', color: 'white'}} to="/resubmit">Resubmit</Link>
          <Link style={{margin: '0 20px', color: 'white'}} to="/results">Results</Link>
        </div>
        <MuiThemeProvider>
          <AppBar
            className={'header rep-me-logo'}
            iconElementLeft={<RepMeLogo />}
            style={
              {
                minHeight: '100px',
                backgroundColor: '#f5f5f5',
                paddingLeft: '80px',
                paddingRight: '80px',
              }
            }
            titleStyle={
              {
                color: 'black',
                whiteSpace: 'normal',
                textOverflow: 'initial',
                maxWidth: '200px',
                lineHeight: '30px',
                fontSize: '20px',
                marginTop: '20px',
              }
            }
            iconStyleLeft={{
              display: 'inherit',
              maxWidth: '80px',
              minWidth: '300px',
            }}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Header;