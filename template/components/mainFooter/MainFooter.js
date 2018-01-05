import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import FontIcon from 'material-ui/FontIcon';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import Scss from './mainFooter.scss';
import RepMeLogo from '../../../template/components/utilities/logoComponent';


const recentsIcon = <ActionHome />;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

class MainFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {
          name: 'facebook',
          path: 'ion-social-facebook-outline'
        },
        {
          name: 'twitter',
          path: 'ion-social-twitter-outline'
        },
        {
          name: 'linkedin',
          path: 'ion-social-linkedin-outline'
        },
        {
          name: 'google',
          path: 'ion-social-googleplus-outline'
        },
        {
          name: 'youtube',
          path: 'ion-social-youtube-outline'
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
      }
    }
    
    return(
      <MuiThemeProvider>
        <footer>
          <div className={'footer-logo'}>
            <div>
              <div style={{
                  maxWidth: '60px',
                }}
              >
                <RepMeLogo />
              </div>
              <div
                className={'rep-me-logo--first-line'}>Represent&mdash;<span>Me</span>
              </div>
              <div className={'rep-me-logo--second-line'}> | by the People 2.0</div>
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
                  onClick={() => this.select(index)}
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