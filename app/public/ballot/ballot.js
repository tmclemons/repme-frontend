import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';

import VoteForm from '../../../template/components/voteForm/VoteForm';
import FlatButton from 'material-ui/FlatButton';
import Banner from '../../../template/components/bannerComponent/BannerComponent'
import Footer from '../../../template/components/mainFooter/MainFooter';

import classNames from 'classnames';
import Scss from './ballot.scss';

// const recentsIcon = <ActionHome />;
// const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
// const nearbyIcon = <IconLocationOn />;

// TODO: Header
// DONE: Custom Slider that passes vote data and color style data
// TODO: Customize slider icon
// DONE: Banner that translates slide color ontop of background image
// DONE: background image
// TODO: Pop on hover over slider
// DONE: inputs for form submission -- form submission
// DONE: form submission button
// DONE: Footer component with social media buttons
// DONE: Social Media buttons
// TODO: refactor styling to a core configuration flow i.e pass one config for all colors
// like this <Component config={this.props.styleConfig} />

const Header = () => (
  <MuiThemeProvider>
    <AppBar
      title="Represent-Me | by the People 2.0"
      iconElementLeft={<div></div>}
      style={
        {
          minHeight: '60px',
          backgroundColor: '#f5f5f5',
          paddingLeft: '80px',
          paddingRight: '80px',
        }
      }
      titleStyle= {
        {
          color: 'black'
        }
      }
      iconStyleLeft={{
        display: 'none'
      }}
    />
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
      },
      backgroundImg: {
        url: 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg'
      },
      viewCopy: {
        headerTagLine: `by the people 2.0`,
        formNotice: `**We will not use any of your information for any 3rd
          Part. Nor will we send you emails unless you opt-in to receive 
          them**`,
        emailInput: `To receive results including final Senate Floor Votes`,
        zipCodeInput: `his will allow us to include your private ballot in
         the constituency that we will provide your Senators`,
        subscribeToHotBill: `To receive other Hot 
          Congressional Bill Ballots and track results`,
        subscribeToOtherLegislationInfo: `to receive information 
          from other Legislators and Bills and Ballot results`,
        subscribeToHotBillTitle: `Opt-In`,
        subscribeToOtherLegislationInfoTitle: `Legislator Opt-In`,
        preSubmitInfo: `This is your private Ballot for 
          (Your Ballot No. H.R. ${'hconres1-115'}-${'191963'})`,
        sliderHint: `Slide to Cast`,
        submissionCTA: `Submit my VOTE`
      }
    }
  }

  submitVote(voteData) {
    //hook api post call here
    console.log(voteData)
  }

  render() {
    return(
      <div className={'ballot__wrapper'}>
        <Header />
        <Banner 
          ballotInfo={this.state.sampleBallot} 
          backgroundImg={this.state.backgroundImg}
        />
        <VoteForm callback={this.submitVote} copy={this.state.viewCopy}/>
        <Footer />
      </div>
    )
  }
}

export default Ballot;