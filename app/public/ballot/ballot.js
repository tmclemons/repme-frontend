import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

// for banner component
//http://www.material-ui.com/#/components/card
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

// for slider component
//http://www.material-ui.com/#/components/slider
import Slider from 'material-ui/Slider';
import HorizontalSlider from 
  '../../../template/components/horizontalSlider/HorizontalSlider';
import Scss from './ballot.scss';


//for form input component
//http://www.material-ui.com/#/components/checkbox
//http://www.material-ui.com/#/components/text-field
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';


// for footer component
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import FontIcon from 'material-ui/FontIcon';
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

// TODO: Header
// TODO: Custom Slider that passes vote data and color style data
// TODO: Customize slider icon
// TODO: Banner that translates slide color ontop of background image
// TODO: background image
// TODO: Pop on hover over slider
// TODO: inputs for form submission -- form submission
// TODO: form submission button
// TODO: Footer component with social media buttons
// TODO: Social Media buttons

let componentProps = {
  sliderPos: 0
}

const Header = () => (
  <MuiThemeProvider>
    <AppBar
      title="Title"
      iconElementLeft={<div></div>}
    />
  </MuiThemeProvider>
)

const BannerOverlay = (color) => {
  var style = {
    backgroundColor: color,
    width: '100%',
    height: '100%',
  };

  return(
    <div className="overlay" style={style}></div>
  )
}

//red rgb(237, 46, 27)
//yellow rgb(255, 206, 52)
//green rgb(48, 173, 64)

const styleForOverlay = {
  width: '100%',
  height: '100%',
  backgroundColor: 'red'
}

const styleForOverlayContent = {
  display: 'none'
}

const Banner = () => (
  <MuiThemeProvider>
    <Card>
      <CardMedia
        overlay={
          <span></span>
        }
        overlayContainerStyle={styleForOverlay}
        overlayContentStyle={styleForOverlayContent}
        >
        <img src="https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg" alt="" />
      </CardMedia>
    </Card>
  </MuiThemeProvider>
  
)

// capture slider data
const onValueChange = (data) => {
  componentProps.sliderPos = data || 0;
}

const SliderComp = () => (
  // <MuiThemeProvider>
  //   <Slider step={0.10} value={0.5} />
  // </MuiThemeProvider>
  <div>
    <HorizontalSlider callback={onValueChange}/> 
  </div>
)

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const Form = () => (
  <MuiThemeProvider>
    <div>
      <TextField
        hintText="Email Address"
        floatingLabelText="To receive results including final Senate Floor Votes"
        // onChange={(event, newValue) => this.setState({ username: newValue })}
      />
      <TextField
        hintText="Zip Code"
        floatingLabelText= "`This will allow us to include your private ballot in the constituency that we will provide your Senators"
        // onChange={(event, newValue) => this.setState({ username: newValue })}
      />
      <div style={styles.block}>
        <Checkbox
          label="to receive other Hot Congressional Bill Ballots and track results"
          style={styles.checkbox}
        />
      </div>
      <div style={styles.block}>
        <Checkbox
          label="to receive information from other Legislators and Bills and Ballot results"
          style={styles.checkbox}
        />
      </div>
      <RaisedButton label="Primary" primary={true} style={null} />
    </div>
  </MuiThemeProvider>
)

const Footer = () => (
  <MuiThemeProvider>
    <footer>
      <BottomNavigation selectedIndex={0}>
        <BottomNavigationItem
          label="Recents"
          icon={recentsIcon}
          onClick={() => this.select(0)}
          />
        <BottomNavigationItem
          label="Favorites"
          icon={favoritesIcon}
          onClick={() => this.select(1)}
          />
        <BottomNavigationItem
          label="Nearby"
          icon={nearbyIcon}
          onClick={() => this.select(2)}
          />
      </BottomNavigation>
    </footer>
  </MuiThemeProvider>
)

class Ballot extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <Header />
        <Banner />
        <SliderComp />
        <Form />
        <Footer />
      </div>
    )
  }
}

export default Ballot;