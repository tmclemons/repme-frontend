import React from 'react'
import VoteForm from '../../../../template/components/voteForm/VoteForm';
import Header from './../components/header/Header';
import Banner from '../../../../template/components/bannerComponent/BannerComponent'
import Footer from '../../../../template/components/mainFooter/MainFooter';
import BarChart from 
  '../../../../template/components/barChartComponent/BarChartComponent';
import ChartJS from 'chart.js';
import BarChartComponent from 
  '../../../../template/components/highCharts/barChartComponent/BarChartComponent';

import Scss from './ballotResults.scss';

class ChartLabelComponent extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    let labels = [];
    let keys = Object.keys(this.props);
    if (typeof this.props === 'object') {
      for (let key in this.props) {
        if (this.props.hasOwnProperty(key)) {
          let prop = this.props[key];
          if(prop.length > 0) {
            labels.push(
              <div key={key}><span>{prop}</span></div>
            )
          }
        }
      }
    }
    return <div className={'vote-labels'}>{labels}</div>;
  }
}


class RepresentativeCard extends React.Component{
  constructor(props){
    super(props)
  }

  toCapitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render(){
    return(
      <div className={'rep__card'}>
        <div className={'rep__card--profile'}>
          <div className="rep__card--profile-title">
            <span className={'rep__card--profile-position'}>
              {this.props.position}
            </span>
            <span>{this.props.firstName}</span>
            <span>{this.props.lastName}</span>
          </div>
          <div className="rep__card--profile-profile-img">
            <img src={this.props.profileImg} 
              alt={
                `${this.props.firstName} ${this.props.firstName} headshot`
            }/>
          </div>
          <div className="rep__card--profile-profile-description">
            <div className={'rep__card--profile-party-icon'}>
              <img src="" alt={`${this.props.party} party icon`}/>
            </div>
            <span>{`${this.toCapitalize(this.props.party)} Party`}</span>
            <span>-</span>
            <span>
              {
                `Member of the U.S. ${this.toCapitalize(this.props.body)} 
                from ${this.toCapitalize(this.props.state)}'s
                 ${this.props.district}th District`
              }
            </span>
          </div>
        </div>
        <div className={'rep__card--vote-data'}>
          <div className={'rep__card--voted'}>
            <i className={`${this.props.voted ? 'ion-checkmark' : 'ion-close'}`}></i>
          </div>
          <div className={'rep__card--voting-parity'}>
            {`In the Past: Voted ${((this.props.votingParity / 1) * 100 || 0 )}%
              of the times on the same siade as you!`}
          </div>
        </div>
      </div>
    )
  }
}

class ChartTitleBarComponent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className={'chart-title'}>
        <div className={'divider'}></div>
        <div className={'content'}>
          <div>{this.props.superTitle || null}</div>
          <h2 className={`${this.props.superTitle ? 'with-super' : ''}`}>{this.props.title || null}</h2>
        </div>
        <div className={'divider'}></div>
      </div>
    )
  }
}
class BallotResults extends React.Component {
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
      },
      repVotes: [
        {
          firstName: 'Mark',
          lastName: 'Kirk',
          position: 'senator',
          profileImg: 'https://i.pinimg.com/736x/a5/56/b8/a556b885cbb54b6495ae2083c0846642--mark-kirk-running-for-president.jpg',
          party: 'republican',
          district: 10,
          votingParity: 1,
          voted: true,
          state: 'illinois',
          body: 'house of representatives'
        },
        {
          firstName: 'Richard',
          lastName: 'Durbin',
          position: 'senator',
          profileImg: 'https://nrf.com/sites/default/files/styles/dynamic_body_side_caption_480x300/public/Images/Who%20We%20Are/Dick-Durbin_wide-1000px.jpg?itok=W0wJtyrM&c=5cab1ece9d195e79bf7351eec4880e36',
          party: 'democratic',
          district: 20,
          votingParity: .5,
          voted: false,
          state: 'illinois',
          body: 'house of representatives'
        }
      ]
    }
  }

  getColorStops = () => {
    let colors = [
      {
        prop: 'stop-0',
        hex: '#30ad40'
      },
      {
        prop: 'stop-1',
        hex: '#45b03f'
      },
      {
        prop: 'stop-2',
        hex: '#59b43e'
      },
      {
        prop: 'stop-3',
        hex: '#6eb73c'
      },
      {
        prop: 'stop-4',
        hex: '#83ba3b'
      },
      {
        prop: 'stop-5',
        hex: '#98be3a'
      },
      {
        prop: 'stop-6',
        hex: '#acc139'
      },
      {
        prop: 'stop-7',
        hex: '#c1c438'
      },
      {
        prop: 'stop-8',
        hex: '#d6c736'
      },
      {
        prop: 'stop-9',
        hex: '#eacb35'
      },
      {
        prop: 'stop-10',
        hex: '#7f7f7f'
      },
      {
        prop: 'stop-11',
        hex: '#fdbe32'
      },
      {
        prop: 'stop-12',
        hex: '#fbae2f'
      },
      {
        prop: 'stop-13',
        hex: '#fa9e2d'
      },
      {
        prop: 'stop-14',
        hex: '#f88e2a'
      },
      {
        prop: 'stop-15',
        hex: '#f67e28'
      },
      {
        prop: 'stop-16',
        hex: '#f46e25'
      },
      {
        prop: 'stop-17',
        hex: '#f25e23'
      },
      {
        prop: 'stop-18',
        hex: '#f14e20'
      },
      {
        prop: 'stop-19',
        hex: '#ef3e1e'
      },
      {
        prop: 'stop-20',
        hex: '#ed2e1b'
      }
    ];
    
    let colorStops = [];

    colors.forEach((stop) => {
      colorStops.push(stop.hex)
    });

    return colorStops.length ? colorStops : null;
  }

  getFormattedData = (resultType) => {
    let constituentData = [ 
      78,
      21,
      33,
      94,
      14,
      90,
      45,
      72,
      12,
      9,
      93,
      57,
      35,
      57,
      17,
      91,
      4,
      59,
      12,
      90,
      41
    ];
    let countryData = [ 
      15,
      4,
      10,
      11,
      13,
      18,
      0,
      7,
      4,
      3,
      10,
      4,
      7,
      4,
      4,
      1,
      1,
      2,
      3,
      0,
      5
    ];
    let dataLabels = [
      'Strongly Agree',
      "",
      "",
      "",
      "",
      'Agree',
      "",
      "",
      "",
      "",
      'Neutral',
      "",
      "",
      "",
      "",
      'Disagree',
      "",
      "",
      "",
      "",
      'Strongly Disagree',
    ];

    let dataChoice = resultType === 'usa' ? countryData : constituentData;
    let formattedData = [];

    dataChoice.forEach((dataItem, index) => {
      formattedData.push(
        {
          y: dataItem,
          color: this.getColorStops()[index],
        }
      )
    });

    return {
      data: formattedData,
      dataLabels: dataLabels
    };
  }

  getSampleDistrictResultsArray = (resultType) => {
    let results = {
      title: null,
      chart: {
        type: 'column',
        spacing: [0,35,0,35]
      },
      plotOptions: {
        series: {
          groupPadding: 0,
          pointPadding: 0,
          colorsByPoint: true,
        },
      },
      colors: this.getColorStops(),
      series:[{
        data: this.getFormattedData(resultType).data,
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: '#FFFFFF',
          align: 'center',
          format: '{point.y:1f}', // no decimal
          y: -30, // 10 pixels down from the top
          style: {
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif'
          }
        }
      }],
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
          text: null
        },
        reversed: true,
        labels: {
          enabled: false
        },
        gridLineWidth: 0,
        tickAmount: 0,
      },
      xAxis: {
        lineWidth: 0,
        tickAmount: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        opposite: true,
        labels: {
          enabled: false
        },
        categories: this.getFormattedData(resultType).dataLabels
      }
    }
    return results;
  }

  submitVote(voteData) {
    //hook api post call here
    console.log(voteData)
  }

  render() {
    const barChartData = {
      labels: this.getSampleDistrictResultsArray().xAxis.categories,
      datasets: [{
        label: 'Dataset 1',
        borderWidth: 1,
        data: this.getSampleDistrictResultsArray().series[0].data
      }]
    };

    return (
      <div className={'ballot__wrapper'}> 
        <Header />
        <Banner
          ballotInfo={this.state.sampleBallot}
          backgroundImg={this.state.backgroundImg}
        />
        <div className={'representative-votes'}>
        {
          this.state.repVotes.map((repVote, index)=>{
            return(
              <RepresentativeCard key={index} { ...repVote} />
            )
          })
        }
        </div>
        <div className={'ballot__results--barchart'}>
          <ChartTitleBarComponent {...{superTitle: null, title: 'Current Constituent Results'}}/>
          <ChartLabelComponent { ...this.getFormattedData().dataLabels}/>
          <BarChartComponent { ...this.getSampleDistrictResultsArray()}/>
        </div>
        <div className={'ballot__results--barchart'}>
          <ChartTitleBarComponent {...{superTitle: 'votes', title: 'United State Results'}}/>
          <ChartLabelComponent { ...this.getFormattedData('usa').dataLabels}/>
          <BarChartComponent { ...this.getSampleDistrictResultsArray('usa')}/>
        </div>
        <Footer />
      </div>
    )
  }
}

export default BallotResults;