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
    let styles={
      appBar: {
        minHeight: '100px',
        backgroundColor: '#f5f5f5',
        paddingLeft: '80px',
        paddingRight: '80px',
      },
      appBarTitle: {
        color: 'black',
        whiteSpace: 'normal',
        textOverflow: 'initial',
        maxWidth: '200px',
        lineHeight: '30px',
        fontSize: '20px',
        marginTop: '20px',
      },
      appBarIconLeft: {
        display: 'inherit',
        maxWidth: '80px',
        minWidth: '300px',
      },
      appBarIconRight: {
        maxHeight: '100px',
        marginRight: '0'
      }
    }
    return(
      <div>
        <AppBar
          className={'header rep-me-logo'}
          iconElementLeft={<div><RepMeLogo style={{pointerEvents: 'none'}} /></div>}
          onLeftIconButtonClick={(evt) => { console.log('click'); window.location=`${this.props.path}`}}
          iconElementRight={
            <img style={{maxHeight: '100%'}} src={this.props.org.image || ''} alt={`${this.props.org.name} Logo`}/>
          }
          style={styles.appBar}
          titleStyle={styles.appBarTitle}
          iconStyleLeft={styles.appBarIconLeft}
          iconStyleRight={styles.appBarIconRight}
        />
      </div>
    )
  }
}

export default Header;