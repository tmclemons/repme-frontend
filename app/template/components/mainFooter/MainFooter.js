import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import RepMeLogoFooter from '../../../template/components/utilities/logoComponentFooter';
import Scss from './mainFooter.scss';


class MainFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {
          name: 'facebook',
          path: 'ion-social-facebook',
          callback: () => {
            window.open('https://www.facebook.com/representmeplease', '_blank')
          }
        },
        {
          name: 'twitter',
          path: 'ion-social-twitter'
        },
        {
          name: 'linkedin',
          path: 'ion-social-linkedin'
        },
        {
          name: 'google',
          path: 'ion-social-googleplus'
        },
        {
          name: 'email',
          path: 'ion-ios-email',
          callback: () => {
            window.open('mailto:mike@represent-me.com?subject="Subscribe to Represent Me"')
          }
        },
        {
          name: 'instagram',
          path: 'ion-social-instagram-outline'
        },
      ]
    }
  }

  render() {
    const styles = {
      iconButtonStyle: {
        minWidth: '32px',
        maxWidth: '32px',
        height: '32px',
        border: '2px solid #c1c2c2',
        background: '#F5F5F5',
        borderRadius: '200px',
        padding: '0',
        margin: '0 10px'
      },
      bottomNavStyles: {
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        paddingTop: '20px',
        paddingBottom: '60px'
      },
      footerLogo: {
        maxWidth: '60px',
        minWidth: '450px'
      }
    }
    
    return(
      <MuiThemeProvider>
        <footer>
          <div className={'footer-logo'}>
            <div>
              <div style={styles.footerLogo}
              >
                <RepMeLogoFooter />
              </div>
            </div>
          </div>
          <BottomNavigation
           selectedIndex={0}
           style={styles.bottomNavStyles}>
          {
            this.state.nav.map( (navItem, index) => {
              return (
                <BottomNavigationItem
                  className={'social-nav'}
                  key={index}
                  disableTouchRipple={true}
                  style={styles.iconButtonStyle}
                  icon={
                    <i 
                      className={`social-nav--icon ${navItem.path}`}
                    ></i>
                  }
                  onClick={() => {navItem.callback ? navItem.callback() : this.select(index)}}
                />
              )
            })
          }
          </BottomNavigation>
        </footer>
      </MuiThemeProvider>
    )
  }
}

export default MainFooter