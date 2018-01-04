import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';

import VoteForm from '../../../template/components/voteForm/VoteForm';
import FlatButton from 'material-ui/FlatButton';
import Banner from '../../../template/components/bannerComponent/BannerComponent'

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
    this.state = {
      sampleBallot: {
        "hash_id": "e893950d-373b-4a85-9d4a-95b8962c0082",
        "number": "hconres1-115",
        "title": "Regarding consent to assemble outside the seat of government.",
        "description": "<p>(This measure has not been amended since it was introduced. The summary of that version is repeated here.)</p> <p>Authorizes the Speaker of the House and the Majority Leader of the Senate, or their respective designees, to notify the Members of the House and the Senate to assemble at a place outside the District of Columbia whenever, in their opinion, the public interest shall warrant it.</p>",
        "image": null,
        "status": null,
        "closing_date": "2018-12-29T14:06:35+0000",
        "bill_created_date": null,
        "bill_modified_date": null,
        "hotbills": []
      }
    }
  }

  submitVote(voteData) {
    console.log(voteData)
  }

  render() {
    return(
      <div>
        <Header />
        <Banner ballotInfo={this.state.sampleBallot}/>
        {/* <SliderComp /> */}
        <VoteForm callback={this.submitVote}/>
        <Footer />
      </div>
    )
  }
}

export default Ballot;