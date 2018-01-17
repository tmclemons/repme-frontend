import React from 'react';
import { Link } from 'react-router-dom'
import VoteForm from '../../../../template/components/voteForm/VoteForm';
import Header from './../components/header/Header';
import Banner from '../../../../template/components/bannerComponent/BannerComponent'
import Footer from '../../../../template/components/mainFooter/MainFooter';
import Results from '../ballotResults/BallotResults';
import Frame from 'react-frame-component';
import NewWindow from 'react-popout';
import axios from 'axios';
import Constants from '../../../../template/components/utilities/constants';
import { instanceOf } from 'prop-types';
import cookie from 'react-cookies';


const { ballotCopy } = Constants;  

import Scss from './ballot.scss';
const SampleHeader = (props) => {
  return (
    <div>
      <div style={{ background: 'black', display: 'flex' }}>
        <Link style={{ margin: '0 20px', color: 'Blue', textDecoration: 'underline' }} to="/">Home </Link>
        <div style={{ margin: '0 20px', color: 'Blue', textDecoration: 'underline' }} onClick={props.callback}>Resubmit</div>
        <Link style={{ margin: '0 20px', color: 'Blue', textDecoration: 'underline' }} to="/repme">Rep-Me Demo </Link>
        <Link style={{ margin: '0 20px', color: 'Blue', textDecoration: 'underline' }} to="/aarp">AARP Demo </Link>
        <Link style={{ margin: '0 20px', color: 'Blue', textDecoration: 'underline' }} to="/print">Print View Demo </Link>
        <Link style={{ margin: '0 20px', color: 'Blue', textDecoration: 'underline' }} to="/?widget=true">Widget Demo </Link>
      </div>
    </div>
  )
}

class Ballot extends React.Component {

  constructor(props) {
    super(props)
    this.states = ['vote', 'results', 'revote', 'print', 'widget'],
    this.state = {
      org: props.match.params.org,
      voteResults: {},
      isWidget: false,
      toImage: false,
      activeState: this.states[0],
      firstTimeUse: true,
      defaultValue: 50,
      voteValue: 50,
      bannerProps: 0,
      step: 5,
      submitCount: 0,
    }
  }

  urlCheck = (urlProps) => {
    let apiUrl = urlProps && urlProps !== this.states[3] && urlProps !== this.states[4] ? `/${urlProps}` : '';
    let apiCheckForImage = urlProps === this.states[3];
    let regex = new RegExp('([^=&?]+)=([^&]+)');
    let queryString = this.props.location.search ? this.props.location.search.match(regex) : null;
    let apiCheckForWidget = queryString && (queryString[2] === 'true') ? true : false;
    let activeState = apiCheckForImage ? this.states[3] : this.states[0];
    activeState = apiCheckForWidget ? this.states[4] : this.states[0];
    
    return {
      url: apiUrl,
      toImage: apiCheckForImage,
      activeState: activeState,
      isWidget: apiCheckForWidget
    }
  }

setCookie = (props, state) => {
  if(props === true) {
    // set cookie to active state
    cookie.save('fromWidget', true, {
      path: '/',
      maxAge: 1000,
    });
    cookie.save('viewState', state, {
      path: '/',
      maxAge: 1000,
    });
  }
  
  if(props === false) {
    cookie.save('viewState', state, {
      path: '/',
      maxAge: 1000,
    });
    // set cookie to active state
    cookie.remove('fromWidget');
  }
}

  componentWillReceiveProps(nextProps) {
    let urlProps = nextProps.match.params.org;
    console.log('click')
    axios.post(`http://54.187.193.156/api/profile${this.urlCheck(urlProps).url}`)
      .then(res => {
        this.setState({
          params: Object.assign(this.state.voteResults, res.data.results),
          activeState: this.urlCheck(urlProps).activeState,
          toImage: this.urlCheck(urlProps).toImage,
          isWidget: this.urlCheck(urlProps).isWidget,
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // capture slider data
  onValueChange = (data) => {
    this.setState({
      bannerProps: (data / (this.state.step)) || 0,
      voteValue: (100 - data),
      firstTimeUse: false,
    })
  }

  submitVote = (voteData) => {
    //hook api post call here
    //DONE: preset data object to zero before data input
    //DONE: Setup ASYNC promises
    this.state.submitCount++
    this.setState({
      firstTimeUse: this.state.submitCount > 0 ? false : true
    })
    let params = this.state;
    if(params.firstTimeUse && params.voteValue === 50) {
    } else {
      let data = {
        "vote": params.voteValue || null,
        "email": voteData['userEmail'] || '',
        "zip_code": voteData['zipCode'] || '',
        "opt_in": voteData['hotBillSubscribe'] ? 1 : 0 || 0,
        "opt_in_two": voteData['otherLegislationSubscribe'] ? 1 : 0 || 0,
        "bill_id": params.voteResults.bill['id'] || null,
      }

      axios.post(`http://54.187.193.156/api/vote`, data)
        .then(res => {
          this.setState({
            activeState: this.states[1],
            voteResults: res.data.results
          })
        })
        .catch(function (error) {
          console.log(error);
        });

        if(this.state.isWidget) {
          this.setCookie(this.urlCheck(this.state.org).isWidget, this.states[1]);
          window.open('/', '_blank');

          //set state to results view
          //set results to cookie
          // on component mount if state is from widget the loaded cookied view
          // after load delete cookies from view
        }
    }
  }

  componentDidMount() {
    let cookieCheck = cookie.load('viewState') === this.states[1] && cookie.load('fromWidget') === "true";

    axios.post(`http://54.187.193.156/api/profile${this.urlCheck(this.state.org).url}`)
      .then(res => {
        this.setState({
          voteResults: res.data.results,
          activeState: cookieCheck ? this.states[1] : this.urlCheck(this.state.org).activeState,
          toImage: this.urlCheck(this.state.org).toImage,
          isWidget: this.urlCheck(this.state.org).isWidget
        })
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setCookie(false, this.urlCheck(this.state.org).activeState)
  }
  /// TODO: clean this data logic up
  showSampleReVoteView = () => {
    axios.post(`http://54.187.193.156/api/profile${this.urlCheck(this.state.org).url}`)
      .then(res => {
        this.setState({
          activeState: this.states[2],
          voteResults: res.data.results
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //TODO: ASAP: GET IT DONE: create better error handling for view changes

  render() {
    //vote view\
    console.log(cookie.loadAll())
    let { bill } = this.state.voteResults;
    if (this.state.activeState === this.states[0] || this.state.activeState === this.states[4]) {
      if (Object.keys(this.state.voteResults).length > 0 && this.state.voteResults.constructor === Object) {
        return (
          <div>
            <SampleHeader { ...{ callback: this.showSampleReVoteView}} />
            <div className={`ballot__wrapper ${this.state.isWidget ? 'widget-view' : ''}`}>
              <Header org={this.state.voteResults.org}/>
              <Banner
                ballotInfo={this.state.voteResults.bill}
                backgroundImg={{url: 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg'}}
                callback={this.submitVote}
                firstTimeUse={this.state.firstTimeUse}
                secondVoteAttempt={this.state.submitCount > 0 ? true : false}
                defaultValue={this.state.defaultValue}
                bannerProps={this.state.bannerProps}
                callback={this.onValueChange}
                showSlider={true}
              />
              <VoteForm firstSubmission={true} chamber={bill.chamber} callback={this.submitVote} copy={ballotCopy}/>
              <Footer />
            </div>
          </div>
        )
      } else {
        return(
          <div className={'ballot__wrapper'} />
        )
      }
    } 
    //results view
    if (this.state.activeState === this.states[1]) {
      if (Object.keys(this.state.voteResults).length > 0 && this.state.voteResults.constructor === Object) {
        return(
          <div>
            <SampleHeader { ...{ callback: this.showSampleReVoteView}} />
            <div className={'ballot__wrapper'}>
              <Header org={this.state.voteResults.org} />
              <Banner
                ballotInfo={this.state.voteResults.bill}
                backgroundImg={{ url: 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg' }}
                callback={this.submitVote}
                firstTimeUse={this.state.firstTimeUse}
                defaultValue={this.state.defaultValue}
                bannerProps={this.state.bannerProps}
                callback={this.onValueChange}
                showSlider={false}
              />
              <Results toImage={this.state.toImage} { ...this.state.voteResults}/>
              <Footer />
            </div>
          </div>
        )
      } else {
        return (<div className={'ballot__wrapper'} /> )
      }
    }

    //results resubmit view
    if (this.state.activeState === this.states[2]) {
      if (Object.keys(this.state.voteResults).length > 0 && this.state.voteResults.constructor === Object) {
        return (
          <div>
            <SampleHeader { ...{ callback: this.showSampleReVoteView }} />
            <div className={'ballot__wrapper'}>
              <Header org={this.state.voteResults.org} />
              <Banner
                ballotInfo={this.state.voteResults.bill}
                backgroundImg={{ url: 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg' }}
                callback={this.submitVote}
                firstTimeUse={this.state.firstTimeUse}
                submitCount={this.state.submitCount}
                defaultValue={this.state.defaultValue}
                bannerProps={this.state.bannerProps}
                callback={this.onValueChange}
                showSlider={true}
              />
              <VoteForm firstSubmission={false} chamber={bill.chamber} callback={this.submitVote} copy={ballotCopy}/>
              <Results toImage={this.state.toImage} { ...this.state.voteResults} />
              <Footer />
            </div>
          </div>
        )
      } else {
        return (<div className={'ballot__wrapper'} />)
      }
    }
    //results print view
    if (this.state.activeState === this.states[3]) {
      if (Object.keys(this.state.voteResults).length > 0 && this.state.voteResults.constructor === Object) {
        return (
          <div>
            <SampleHeader { ...{ callback: this.showSampleReVoteView }} />
            <div className={'ballot__wrapper'}>
              <div id={'delete-results'}>
                <Results toImage={this.state.toImage} { ...this.state.voteResults} />
              </div>
            </div>
          </div>
        )
      } else {
        return (<div className={'ballot__wrapper'} />)
      }
    } else {
      return (
        <div> Something went wrong</div>
      )
    }
  }
}

export default Ballot;