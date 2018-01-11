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
import ChartLabelComponent from '../../../../template/components/chartLabelComponent/ChartLabelComponent';
import StateDemographic from '../../../../template/components/demographicComponent/DemographicComponent';
import RepresentativeCard from '../../../../template/components/representativeCardComponent/RepresentativeCardComponent';
import ChartTitleBarComponent from '../../../../template/components/titleBarComponent/TitleBarComponent';
import StateIllinois from '../../../../template/components/utilities/SampleStateComponent';

import Scss from './ballotResults.scss';
  
class BallotResults extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      yourState: 'Il',
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
      repDemographics: {
        state: 'illinois',
        districtCity: 'chicago',
        maleVotes: 345,
        femaleVotes: 279,
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

  getFormattedData = () => {
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

    let formattedData = [];
    let formattedDataBuffer = [];
    let param = this.props.bill.data;

    // this.props.bill.data
    let sortBuffer = [];
    for (var prop in param) {
      if (param.hasOwnProperty(prop)) {
        sortBuffer.push(
          {
            order: Number(prop.split('-')[0]),
            label: prop,
            value: param[prop]
          }
        )
      }
    }
    
    sortBuffer.sort(function (a, b) {
      return b.order - a.order;
    });

    sortBuffer.forEach((buffer) => {
      formattedDataBuffer.push(buffer.value)
    });

    formattedDataBuffer.forEach((dataItem, index) => {
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
      <div> 
        {/* <div className={'representative-votes'}>
          <RepresentativeCard component={StateIllinois} votes={this.state.repVotes}/>
        </div> */}
        <div className={'ballot__results--barchart'}>
          <ChartTitleBarComponent {...{superTitle: null, title: 'Current Constituent Results'}}/>
          <StateDemographic component={StateIllinois} { ...this.state.repDemographics}/>
          <ChartLabelComponent { ...this.getFormattedData().dataLabels}/>
          <BarChartComponent {  ...this.getSampleDistrictResultsArray()}/>
        </div>
        <div className={'ballot__results--barchart'}>
          <ChartTitleBarComponent {...{superTitle: 'votes', title: 'United State Results'}}/>
          <ChartLabelComponent { ...this.getFormattedData('usa').dataLabels}/>
          <BarChartComponent {  ...this.getSampleDistrictResultsArray('usa')}/>
        </div>
      </div>
    )
  }
}

export default BallotResults;