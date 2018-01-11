import React from 'react'
import VoteForm from '../../../../template/components/voteForm/VoteForm';
import Header from './../components/header/Header';
import Banner from '../../../../template/components/bannerComponent/BannerComponent'
import Footer from '../../../../template/components/mainFooter/MainFooter';
import axios from 'axios';

import Scss from './ballot.scss';

class Ballot extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      params: {},
      backgroundImg: {
        url: 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg'
      },
      viewCopy: {
        headerTagLine: `by the people 2.0`,
        formNotice: `**We will not use any of your information for any 3rd
          Part. Nor will we send you emails unless you opt-in to receive 
          them**`,
        emailInput: `To receive results including final Senate Floor Votes`,
        zipCodeInput: `This will allow us to include your private ballot in
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
    //TODO: preset data object to zero before data input
    //TODO: Setup ASYNC promises
    console.log(voteData)
  }


  componentDidMount() {
    axios.post(`http://54.187.193.156/api/profile`)
      .then(res => {
        this.setState({
          params: Object.assign(this.state.params, res.data.results)
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
      if (Object.keys(this.state.params).length > 0 && this.state.params.constructor === Object) {
        return (
          <div className={'ballot__wrapper'}>
            <Header org={this.state.params.org}/>
            <Banner
              ballotInfo={this.state.params.bill}
              backgroundImg={'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg'}
              showSlider={true}
            />
            <VoteForm firstSubmission={true} callback={this.submitVote} copy={this.state.viewCopy} />
            <Footer />
          </div>
        )
      } else {
        return(
          <div className={'ballot__wrapper'} />
        )
      }
  }
}

export default Ballot;