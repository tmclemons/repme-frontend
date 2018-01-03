import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import VoteForm from '../../../template/components/voteForm/VoteForm';

// for banner component
//http://www.material-ui.com/#/components/card
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

// for slider component
//http://www.material-ui.com/#/components/slider
import Slider from 'material-ui/Slider';
import HorizontalSlider from 
  '../../../template/components/horizontalSlider/HorizontalSlider';
import classNames from 'classnames';
import Scss from './ballot.scss';


// for footer component
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import FontIcon from 'material-ui/FontIcon';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';

const recentsIcon = <ActionHome />;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

// TODO: Header
// DONE: Custom Slider that passes vote data and color style data
// TODO: Customize slider icon
// DONE: Banner that translates slide color ontop of background image
// TODO: background image
// TODO: Pop on hover over slider
// DONE: inputs for form submission -- form submission
// DONE: form submission button
// TODO: Footer component with social media buttons
// TODO: Social Media buttons

const Header = () => (
  <MuiThemeProvider>
    <AppBar
      title="Title"
      iconElementLeft={<div></div>}
    />
  </MuiThemeProvider>
)


class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentProps: 0,
      step: 5,
      max: 100,
      defaultValue: 0
    }
  }
  
  styleForOverlay = {
    width: '100%',
    height: '100%',
  }

  // capture slider data
  onValueChange = (data) => {
    this.setState({
      componentProps: (data / (this.state.step)) || 0
    })
  }

  render() {

    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardMedia
              overlay={
                <div
                  className={classNames(
                    `slider__color--stop-${this.state.componentProps}`
                  )}
                >
                </div>
              }
              overlayContainerStyle={this.styleForOverlay}
              overlayContentStyle={this.styleForOverlay}
              >
              <img src="https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg" alt="" />
            </CardMedia>
          </Card>
        </MuiThemeProvider>
        <div className={'slider--horizontal'}>
          <HorizontalSlider
          step={this.state.step}
          max={this.state.max}
          defaultValue={this.state.defaultValue}
          callback={this.onValueChange}
          />
        </div>
      </div>
    )
  }
}

const Footer = () => (
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

class Ballot extends React.Component {
  constructor(props) {
    super(props)
  }

  submitVote(voteData) {
    console.log(voteData)
  }

  render() {
    return(
      <div>
        <Header />
        <Banner />
        {/* <SliderComp /> */}
        <VoteForm callback={this.submitVote}/>
        <Footer />
      </div>
    )
  }
}

export default Ballot;