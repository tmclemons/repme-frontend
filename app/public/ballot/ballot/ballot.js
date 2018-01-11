import React from 'react'
import VoteForm from '../../../../template/components/voteForm/VoteForm';
import Header from './../components/header/Header';
import Banner from '../../../../template/components/bannerComponent/BannerComponent'
import Footer from '../../../../template/components/mainFooter/MainFooter';
import Results from '../ballotResults/BallotResults';
import axios from 'axios';

import Scss from './ballot.scss';

class Ballot extends React.Component {

  constructor(props) {
    super(props)
    this.states = ['vote', 'results', 'results-revote'],
    this.state = {
      activeState: 'vote',
      voteResults: null,
      firstTimeUse: true,
      defaultValue: 50,
      voteValue: 50,
      bannerProps: 0,
      step: 5,
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
  //TODO: Post TO

  // capture slider data
  onValueChange = (data) => {
    this.setState({
      bannerProps: (data / (this.state.step)) || 0,
      voteValue: data,
      firstTimeUse: false,
    })
  }

  submitVote = (voteData) => {
    //hook api post call here
    //DONE: preset data object to zero before data input
    //DONE: Setup ASYNC promises
    let params = this.state;
    if(params.firstTimeUse && params.voteValue === 50) {
      alert('Must Choose Vote')
    } else {
      let data = {
        "vote": params.voteValue || null,
        "email": voteData['userEmail'] || '',
        "zip_code": voteData['zipCode'] || '',
        "opt_in": voteData['hotBillSubscribe'] ? 1 : 0 || 0,
        "bill_id": params.params.bill['id'] || null,
      }
      console.log(data)

      axios.post(`http://54.187.193.156/api/vote`, data)
        .then(res => {
          this.setState({
            activeState: this.states[1],
            voteResults: res.data
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }


  componentDidMount() {
    axios.post(`http://54.187.193.156/api/profile`)
      .then(res => {
        this.setState({
          params: Object.assign(this.state.params, res.data.results),
          activeState: this.states[0]
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.activeState === 'vote') {
      if (Object.keys(this.state.params).length > 0 && this.state.params.constructor === Object) {
        return (
          <div className={'ballot__wrapper'}>
            <Header org={this.state.params.org}/>
            <Banner
              ballotInfo={this.state.params.bill}
              backgroundImg={{url: 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg'}}
              callback={this.submitVote}
              firstTimeUse={this.state.firstTimeUse}
              defaultValue={this.state.defaultValue}
              bannerProps={this.state.bannerProps}
              callback={this.onValueChange}
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

    if (this.state.activeState === 'results') {
      if (Object.keys(this.state.voteResults).length > 0 && this.state.voteResults.constructor === Object) {
        return(
          <div className={'ballot__wrapper'}>
            <Header org={this.state.params.org} />
            <Banner
              ballotInfo={this.state.params.bill}
              backgroundImg={{ url: 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg' }}
              callback={this.submitVote}
              firstTimeUse={this.state.firstTimeUse}
              defaultValue={this.state.defaultValue}
              bannerProps={this.state.bannerProps}
              callback={this.onValueChange}
              showSlider={false}
            />
            <Results { ...this.state.voteResults}/>
            <Footer />
          </div>
        )
      } else {
        return (<div className={'ballot__wrapper'} /> )
      }
    } else {
      return (
        <div> Something went wrong</div>
      )
    }
  }
}

export default Ballot;