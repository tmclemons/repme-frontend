import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import FontIcon from 'material-ui/FontIcon';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';

const recentsIcon = <ActionHome />;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

class MainFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <MuiThemeProvider>
        <footer>
          <BottomNavigation selectedIndex={0}>
            <BottomNavigationItem
              label="Recents"
              icon={recentsIcon}
              onClick={() => this.select(0)}
            />
            {/* <BottomNavigationItem
          label="Favorites"
          icon={favoritesIcon}
          onClick={() => this.select(1)}
          />
        <BottomNavigationItem
          label="Nearby"
          icon={nearbyIcon}
          onClick={() => this.select(2)}
          /> */}
          </BottomNavigation>
        </footer>
      </MuiThemeProvider>
    )
  }
}

export default MainFooter