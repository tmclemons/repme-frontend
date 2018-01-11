import React from 'react';
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
        <MuiThemeProvider>
          <AppBar
            className={'header rep-me-logo'}
            iconElementLeft={<RepMeLogo />}
            iconElementRight={
              <img style={{width: '100%'}} src={this.props.org.image || ''} alt={`${this.props.org.name} Logo`}/>
            }
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
            iconStyleRight={{
              maxWidth: '200px',
            }}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Header;