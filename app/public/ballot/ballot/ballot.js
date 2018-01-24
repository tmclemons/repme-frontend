import React from 'react';
import { Link } from 'react-router-dom'
import VoteForm from '../../../../template/components/voteForm/VoteForm';
import Header from './../components/header/Header';
import Banner from '../../../../template/components/bannerComponent/BannerComponent'
import Footer from '../../../../template/components/mainFooter/MainFooter';
import Results from '../results/results';
import axios from 'axios';
import Constants from '../../../../template/components/utilities/constants';
import cookie from 'react-cookies';
import updateCookie from '../../../../template/components/utilities/cookieComponent';
import Scss from './ballot.scss';

const { ballotCopy } = Constants;  

class Ballot extends React.Component {

  constructor(props) {
    super(props)
    this.states = ['vote', 'results', 'revote', 'print', 'widget'];
    this.voteResults = {};
    this.legislators = [];
    this.voteValue = 50;
    this.sliderDebounce = false;
    this.ipAddress = `54.201.100.159`;
    this.sampleBG = 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg';
    this.state = {
      bannerProps: 50,
      org: props.match.params.org,
      isWidget: false,
      activeState: this.states[0],
      firstTimeUse: true,
      secondTimeAttempt: false,
      defaultValue: 50,
      step: 1,
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


  // capture slider data
  onValueChange = (data, inUse) => {
    let bannerProps = (data / (this.state.step)) || this.state.bannerProps
    this.voteValue = (100 - data);
    this.sliderDebounce = (inUse ? inUse : false);
    updateCookie.setUserFlow('firstTimeVote', false)
    updateCookie.setUserFlow('secondTimeAttempt', false);
    updateCookie.setUserFlow('sliderPristine', false);
    this.setState({
      bannerProps: bannerProps
    });
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
    
    let data = {
      "guid": updateCookie.get('guid') ? updateCookie.get('guid') : '',
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
          activeState: this.locationCheckForWidget() ? this.states[4] : this.states[1],
        })
        this.loadingSpinnerToggle('hide');
      })
      .then(() => {

        updateCookie.setUserFlow('firstTimeVote', false)

        if (this.state.isWidget) {
          updateCookie.set(this.state.isWidget, this.states[1], this.voteResults);
        } else {
          updateCookie.set(this.state.isWidget, this.states[1], this.voteResults);
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
    slug = slug ? slug : this.state.org;
    axios.post(`http://${this.ipAddress}/api${this.urlCheck(slug).url}`,
      (updateCookie.get('guid') ? updateCookie.get('guid') : { guid: '' }))
      .then(res => {
        this.voteResults = res.data.results;
        if(this.voteResults.legislators) {
          Object.keys(this.voteResults.legislators).map((key) => {
            let obj = {};
            obj[key] = this.voteResults.legislators[key].data;
            this.legislators.push(obj);
        })
      }
        this.setState({
          activeState: res.data.page_state || this.states[0],
          isWidget: this.locationCheckForWidget(),
          submitCount: 0
        })
        this.loadingSpinnerToggle('hide');
      })
      .then(() => {
        if (this.state.activeState === this.states[1]) {
          updateCookie.setUserFlow('firstTimeVote', false);
          updateCookie.setUserFlow('secondTimeAttempt', false);
        } else {
          updateCookie.setUserFlow('firstTimeVote', true);
          updateCookie.setUserFlow('secondTimeAttempt', false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  submitVote = (voteData) => {
    if (this.locationCheckForWidget()) {
      window.open('/', '_blank');
    } else {
      if ( updateCookie.getUserFlow('sliderPristine') ) {
        this.state.submitCount++;
        updateCookie.setUserFlow('firstTimeVote', (this.state.submitCount > 0 ? false : true));
        updateCookie.setUserFlow('secondTimeAttempt', (this.state.submitCount === 1 ? true : false));
      }
      this.sliderDebounce = false;
      this.setState({
        firstTimeUse: updateCookie.getUserFlow('firstTimeVote')
      });
      
      if ((updateCookie.getUserFlow('firstTimeVote') && this.state.submitCount > 1 )  && this.voteValue === 50) {
        return null;
      } else {
        if (!updateCookie.getUserFlow('firstTimeVote') && !updateCookie.getUserFlow('secondTimeAttempt')) {
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
    updateCookie.setUserFlow('firstTimeVote', true);
    updateCookie.setUserFlow('secondTimeAttempt', false);
    this.voteResults = 50;
    this.receiveDataFromApi(urlProps);
  }

  componentDidMount() {
    updateCookie.setUserFlow('sliderPristine', true);
    updateCookie.setUserFlow('firstTimeVote', true);
    updateCookie.setUserFlow('secondTimeAttempt', false);
    this.receiveDataFromApi();
  }
    
  render() {
    //vote view
    let { bill } = this.voteResults;
    let { submitCount } = this.state;
    let exportCheck = this.props.match.params.org && this.props.match.params.zipcode

    if (this.state.activeState === this.states[0] && !exportCheck) {
      if (Object.keys(this.voteResults).length > 0 && this.voteResults.constructor === Object) {
        return (
          <div>
            <div className={`ballot__wrapper ${this.state.isWidget ? 'widget-view' : ''}`}>
              <Header org={this.voteResults.org}/>
              <Banner
                ballotInfo={this.voteResults.bill}
                backgroundImg={{url: this.sampleBG}}
                callback={this.submitVote}
                firstTimeUse={updateCookie.getUserFlow('firstTimeVote')}
                secondAttempt={updateCookie.getUserFlow('secondTimeAttempt')}
                defaultValue={this.state.defaultValue}
                bannerProps={this.state.bannerProps}
                callback={this.onValueChange}
                showSlider={true}
                step={this.state.step}
              />
              <VoteForm 
                firstSubmission={true} 
                chamber={bill.chamber} 
                callback={this.submitVote} 
                firstTimeUse={updateCookie.getUserFlow('firstTimeVote')}
                secondAttempt={updateCookie.getUserFlow('secondTimeAttempt')}
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
            <div className={'ballot__wrapper'}>
              <Header org={this.voteResults.org} />
              <Banner
                ballotInfo={this.voteResults.bill}
                backgroundImg={{ url: this.sampleBG }}
                callback={this.submitVote}
                firstTimeUse={false}
                secondAttempt={false}
                defaultValue={this.state.defaultValue}
                bannerProps={this.state.bannerProps}
                callback={this.onValueChange}
                showSlider={true}
                step={this.state.step}
              />
              <VoteForm 
                firstSubmission={false} 
                chamber={bill.chamber} 
                callback={this.submitVote} 
                copy={ballotCopy} 
                debounce={true}
              />
              <Results resultsTitle={'Current Constituent Results'} toImage={false} { ...this.voteResults}/>
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
            <div className={'ballot__wrapper'}>
              <Header org={this.voteResults.org} />
              <Banner
                ballotInfo={this.voteResults.bill}
                backgroundImg={{ url: this.sampleBG }}
                callback={this.submitVote}
                firstTimeUse={updateCookie.getUserFlow('firstTimeVote')}
                defaultValue={this.state.defaultValue}
                bannerProps={this.state.bannerProps}
                callback={this.onValueChange}
                showSlider={true}
                step={this.state.step}
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
    if (this.state.activeState === this.states[0] && exportCheck) {
      if (Object.keys(this.voteResults).length > 0 && this.voteResults.constructor === Object && this.legislators.length) {
        return (
          <div>
            <div className={'ballot__wrapper'} >
              <div id={'delete-results'}>
                <div id={'your-results'}>
                  <Results 
                    resultsTitle={'Country Results'}
                    toImage={true} 
                    showDemographics={true} 
                    { ...this.voteResults} 
                  />
                  {
                    this.legislators.map((legislator, index) => {
                      let legislatorID = Object.keys(legislator)[0];
                      return(
                        <Results 
                          resultsTitle={'Current Constituent Results'}
                          legislatorsID={legislatorID} 
                          id={index} 
                          key={index} 
                          toImage={true} 
                          showDemographics={false} 
                          { ...{bill: {data: legislator[legislatorID]}}} 
                          />
                      )
                    })}
                  </div>
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