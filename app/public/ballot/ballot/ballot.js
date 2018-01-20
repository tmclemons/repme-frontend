import React from 'react';
import { Link } from 'react-router-dom'
import VoteForm from '../../../../template/components/voteForm/VoteForm';
import Header from './../components/header/Header';
import Banner from '../../../../template/components/bannerComponent/BannerComponent'
import Footer from '../../../../template/components/mainFooter/MainFooter';
import Results from '../ballotResults/BallotResults';
import axios from 'axios';
import Constants from '../../../../template/components/utilities/constants';
import { instanceOf } from 'prop-types';
import cookie from 'react-cookies';


const { ballotCopy } = Constants;  

import Scss from './ballot.scss';
const SampleHeader = (props) => {
  return (
    <div>
      <div style={{ background: 'black', display: 'none' }}>
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
    this.states = ['vote', 'results', 'revote', 'print', 'widget'];
    this.voteResults = {};
    this.legislators = [];
    this.bannerProps = 10;
    this.voteValue = 50;
    this.sliderDebounce = false;
    this.ipAddress = `54.201.100.159`;
    this.state = {
      org: props.match.params.org,
      isWidget: false,
      activeState: this.states[0],
      firstTimeUse: true,
      secondTimeAttempt: false,
      defaultValue: 50,
      step: 5,
      submitCount: 0,
      exportView: false
    }
  }

  locationCheckForWidget = () => {
    let regex = new RegExp('([^=&?]+)=([^&]+)');
    let queryString = this.props.location.search ? this.props.location.search.match(regex) : null;
    let apiCheckForWidget = queryString && (queryString[2] === 'true') ? true : false;
    return apiCheckForWidget;
  }

  urlCheck = (urlProps) => {
    let billIdCheck = urlProps ? urlProps.split('-') : '';
    let apiUrl = urlProps && ( urlProps !== this.states[3] ) && ( urlProps !== this.states[4] ) ? `/${urlProps}` : '';
    let apiCheckForImage = urlProps === this.states[3];
    
    return {
      url: billIdCheck.length > 1 ? `/bill/${urlProps}` : `/profile${apiUrl}`,
    }
  }

  // TODO: change to receive state and guid props
  updateCookie = () => {
    // set cookie props
    const set = (name, data, props) => {
      if (name && data) {
        props = props && typeof props === 'object' ? props : null
        cookie.save(name, data, props)
      }
    }

    const get = (name) => {
      if (name) {
        cookie.load(name);
      }
    }

    const remove = (name) => {
      if(name){
        cookie.remove(name)
      }
    }

    const setUserFlow = (userFlow, bool) => {
      bool = typeof bool === 'boolean' ? bool : true;
      cookie.remove(userFlow);
      cookie.save(userFlow, (bool), {
        path: '/',
        maxAge: 1000,
      });
      return bool;
    }

    const getUserFlow = (userFlow) => {
      let cookieResult = cookie.load(userFlow) == 'true' ? true : false;
      return cookieResult;
    }
    return {
      set: set,
      get: get,
      remove: remove,
      setUserFlow: setUserFlow,
      getUserFlow: getUserFlow
    }
  }

  // capture slider data
  onValueChange = (data, inUse) => {
    this.bannerProps = (data / (this.state.step)) || this.bannerProps
    this.voteValue = (100 - data);
    this.sliderDebounce = (inUse ? inUse : false);
    this.updateCookie().setUserFlow('firstTimeVote', false)
    this.updateCookie().setUserFlow('secondTimeAttempt', false);
    this.updateCookie().setUserFlow('sliderPristine', false);
  }

  loadingSpinnerToggle = (show) => {
    let spinner = document.getElementById('loading-spinner');
    let wrapper = document.getElementById('app-wrapper');

    if (spinner && show === 'hide') {
      spinner.style.display = 'none';
      wrapper.style.display = 'inherit';
    } else {
      spinner.style.display = 'flex';
      wrapper.style.display = 'none';
    } 
  }

  submitDataToApi = (voteData) => {
    let params = this.state;
    let cookieFlow = this.updateCookie();
    
    let data = {
      "guid": cookieFlow.get('guid') ? cookieFlow.get('guid') : '',
      "vote": this.voteValue,
      "email": voteData['userEmail'] || '',
      "zip_code": voteData['zipCode'] || '',
      "opt_in": voteData['hotBillSubscribe'] ? 1 : 0 || 0,
      "opt_in_two": voteData['otherLegislationSubscribe'] ? 1 : 0 || 0,
      "bill_id": this.voteResults.bill['id'] || null,
    }

    if (this.props.match.params.org && this.props.match.params.zip_code) {
      data.guid = 0;
      data.zip_code = this.props.match.params.zip_code;
    }

    axios.post(`http://${this.ipAddress}/api/vote`, data)
      .then(res => {
        this.voteResults = res.data.results;
        if (res.data.legislators) {
          this.legislators = res.data.legislators;
        }
        this.setState({
          // here is where state will be maintained or lost after vote submission
          activeState: this.locationCheckForWidget() ? this.states[4] : this.states[1],
        })
        this.loadingSpinnerToggle('hide');
      })
      .then(() => {
        //old logic
        this.updateCookie().setUserFlow('firstTimeVote', false)
        if (this.state.isWidget) {
          this.updateCookie().set(this.state.isWidget, this.states[1], this.voteResults);
        } else {
          this.updateCookie().set(this.state.isWidget, this.states[1], this.voteResults);
        }
      })
      .then(() => {
        this.setState({
          firstTimeUse: true
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  receiveDataFromApi = (slug) => {
    let cookieFlow = this.updateCookie();
    slug = slug ? slug : this.state.org;
    axios.post(`http://${this.ipAddress}/api${this.urlCheck(slug).url}`,
      (cookieFlow.get('guid') ? cookieFlow.get('guid') : { guid: '' }))
      .then(res => {
        this.voteResults = res.data.results;
        this.setState({
          activeState: res.data.page_state || this.states[0],
          isWidget: this.locationCheckForWidget(),
          submitCount: 0
        })
        this.loadingSpinnerToggle('hide');
      })
      .then(() => {
        if (this.state.activeState === this.states[1]) {
          cookieFlow.setUserFlow('firstTimeVote', false);
          cookieFlow.setUserFlow('secondTimeAttempt', false);
        } else {
          cookieFlow.setUserFlow('firstTimeVote', true);
          cookieFlow.setUserFlow('secondTimeAttempt', false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  submitVote = (voteData) => {
    //TODO: add guid logic
    
    if (this.locationCheckForWidget()) {
      window.open('/', '_blank');
    } else {
      if ( this.updateCookie().getUserFlow('sliderPristine') ) {
        this.state.submitCount++;
        this.updateCookie().setUserFlow('firstTimeVote', (this.state.submitCount > 0 ? false : true));
        this.updateCookie().setUserFlow('secondTimeAttempt', (this.state.submitCount === 1 ? true : false));
      }
      this.sliderDebounce = false;
      this.setState({
        firstTimeUse: this.updateCookie().getUserFlow('firstTimeVote')
      });
      
      if ((this.updateCookie().getUserFlow('firstTimeVote') && this.state.submitCount > 1 )  && this.voteValue === 50) {
        return null;
      } else {
        if (!this.updateCookie().getUserFlow('firstTimeVote') && !this.updateCookie().getUserFlow('secondTimeAttempt')) {
          if ((this.state.activeState === this.states[1]) || voteData['userIsSure']) {
            this.loadingSpinnerToggle('show');
            this.submitDataToApi(voteData)
          }
        }
      }
    }

  }

  // LIFE CYCLE HOOKS
  componentWillReceiveProps(nextProps) {
    let urlProps = nextProps.match.params.org;
    this.updateCookie().setUserFlow('firstTimeVote', true);
    this.updateCookie().setUserFlow('secondTimeAttempt', false);
    this.voteResults = 50;
    this.receiveDataFromApi(urlProps);
  }

  componentDidMount() {
    let cookieFlow = this.updateCookie();
    cookieFlow.setUserFlow('sliderPristine', true);
    cookieFlow.setUserFlow('firstTimeVote', true);
    cookieFlow.setUserFlow('secondTimeAttempt', false);
    this.receiveDataFromApi();
  }
    
  //TODO: ASAP: GET IT DONE: create better error handling for view changes
  render() {
    //vote view
    let { bill } = this.voteResults;
    let { submitCount } = this.state;
    if (this.state.activeState === this.states[0]) {
      if (Object.keys(this.voteResults).length > 0 && this.voteResults.constructor === Object) {
        return (
          <div>
            <SampleHeader { ...{ callback: this.receiveDataFromApi}} />
            <div className={`ballot__wrapper ${this.state.isWidget ? 'widget-view' : ''}`}>
              <Header org={this.voteResults.org}/>
              <Banner
                ballotInfo={this.voteResults.bill}
                backgroundImg={{url: 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg'}}
                callback={this.submitVote}
                firstTimeUse={this.updateCookie().getUserFlow('firstTimeVote')}
                secondAttempt={this.updateCookie().getUserFlow('secondTimeAttempt')}
                defaultValue={this.state.defaultValue}
                bannerProps={this.bannerProps}
                callback={this.onValueChange}
                showSlider={true}
              />
              <VoteForm 
                firstSubmission={true} 
                chamber={bill.chamber} 
                callback={this.submitVote} 
                firstTimeUse={this.updateCookie().getUserFlow('firstTimeVote')}
                secondAttempt={this.updateCookie().getUserFlow('secondTimeAttempt')}
                copy={ballotCopy}
                debounce={this.sliderDebounce}
              />
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
      if (Object.keys(this.voteResults).length > 0 && this.voteResults.constructor === Object) {
        return(
          <div>
            <SampleHeader { ...{ callback: this.receiveDataFromApi}} />
            <div className={'ballot__wrapper'}>
              <Header org={this.voteResults.org} />
              <Banner
                ballotInfo={this.voteResults.bill}
                backgroundImg={{ url: 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg' }}
                callback={this.submitVote}
                firstTimeUse={false}
                secondAttempt={false}
                defaultValue={this.state.defaultValue}
                bannerProps={this.bannerProps}
                callback={this.onValueChange}
                showSlider={true}
              />
              <VoteForm 
                firstSubmission={false} 
                chamber={bill.chamber} 
                callback={this.submitVote} 
                copy={ballotCopy} 
                debounce={true}
              />
              <Results toImage={false} { ...this.voteResults}/>
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
      if (Object.keys(this.voteResults).length > 0 && this.voteResults.constructor === Object) {
        return (
          <div>
            <SampleHeader { ...{ callback: this.receiveDataFromApi }} />
            <div className={'ballot__wrapper'}>
              <Header org={this.voteResults.org} />
              <Banner
                ballotInfo={this.voteResults.bill}
                backgroundImg={{ url: 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg' }}
                callback={this.submitVote}
                firstTimeUse={this.updateCookie().getUserFlow('firstTimeVote')}
                defaultValue={this.state.defaultValue}
                bannerProps={this.bannerProps}
                callback={this.onValueChange}
                showSlider={true}
              />
              <VoteForm 
                firstSubmission={false} 
                chamber={bill.chamber} 
                callback={this.submitVote} 
                copy={ballotCopy}
                debounce={true}
              />
              <Results toImage={false} { ...this.voteResults} />
              <Footer />
            </div>
          </div>
        )
      } else {
        return (<div className={'ballot__wrapper'} />)
      }
    }

    //results print view
    if (this.state.activeState === this.states[1] && this.props.match.params.org && this.props.match.params.zip_code) {
      if (Object.keys(this.voteResults).length > 0 && this.voteResults.constructor === Object) {
        return (
          <div>
            <SampleHeader { ...{ callback: this.receiveDataFromApi }} />
            <div className={'ballot__wrapper'}>
              <div id={'delete-results'}>
                <Results toImage={true} showDemographics={true} { ...this.voteResults} />
                {
                  this.legislators.map((legislator, index) => {
                    return(
                      <Results id={Object.keys(legislator)[0]} key={index} toImage={true} showDemographics={false} { ...this.legislator.data} />
                    )
                })}
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