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
import Constants from '../../../../template/components/utilities/constants';
const { colorStops } = Constants;  

import Scss from './ballotResults.scss';
  
class BallotResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      yourState: 'IL',
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

    let colorBuffer = [];
    colorStops.forEach((stop) => {
      colorBuffer.push(stop.hex)
    });

    return colorBuffer.length ? colorBuffer : null;
  }

  setVoteIconPosition(data, param) {
    let voteRanges = [];
    let splitRange = data.xPos.split('-'); 
    let vote = data.comparableValue;
    if ((Number(splitRange[0]) - .001) < vote ) {
      if (Number(`${splitRange[1]}.001`) > vote) {
        return true;
      }
    } else {
      return false;
    }
  }

  getFormattedData = () => {
    let textLabels = [
      'Strongly Disagree',
      "",
      "",
      "",
      "",
      'Disagree',
      "",
      "",
      "",
      "",
      'Neutral',
      "",
      "",
      "",
      "",
      'Agree',
      "",
      "",
      "",
      "",
      'Strongly Agree',
    ];

    let formattedData = [];
    let formattedDataBuffer = [];
    let dataLabels = [];
    let param = this.props.bill.data;

    // this.props.bill.data
    let sortBuffer = [];
    for (var prop in param) {
      if (param.hasOwnProperty(prop)) {
        sortBuffer.push(
          {
            minOrder: Number(prop.split('-')[0]),
            maxOrder: Number(prop.split('-')[1]),
            label: prop,
            value: param[prop]
          }
        )
      }
    }
    
    sortBuffer.sort(function (a, b) {
      return a.minOrder - b.minOrder;
    });

    sortBuffer.forEach((buffer) => {
      formattedDataBuffer.push(buffer.value);
      dataLabels.push(buffer.label);
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
      textLabels: textLabels,
      dataLabels: dataLabels
    };
  }

  getSampleDistrictResultsArray = (resultType) => {
    let voteResult = this.props.vote;
    let getFormattedData = this.getFormattedData(resultType);
    let setVoteIconPosition = this.setVoteIconPosition;
    let param = this.props.bill.data;
    let resultTypeCheck = resultType ? true : false;
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
        data: getFormattedData.data,
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: '#FFFFFF',
          align: 'left',
          // format: '{point.y:1f}', // no decimal
          y: -30, // 10 pixels down from the top
          //this.series.xAxis.labelAlign
            useHTML: true,
            formatter: function() {
              let positionTest = setVoteIconPosition({
                xPos: this.x,
                yPos: this.y,
                comparableValue: voteResult
              });
              let pointWidth = Math.round(this.point.pointWidth);
              let pointHeight = pointWidth * 2.7;
              let labelPos = 5;
              if (positionTest & !resultTypeCheck) {
                let results = 
                '<div>'+
                  `<div style='width:${pointWidth}px;text-align: center;position: absolute;left: -5px;color:${this.point.y<3?'black':'white'}'>${this.point.y}</div>` +
                  `<div style=" left: ${-labelPos}px; position: absolute; width: ${pointWidth}px; height:${pointWidth * 2.7}px; top: ${-this.point.shapeArgs.height - pointHeight + (pointWidth * .667)}px; background-image:url('/images/yourVoteIcon.png'); background-size:cover; background-repeat: no-repeat">`+
                  '</div>' +
                '</div>';
                return this.point.y < 1 ? null : results;
              } else {
                let results = 
                '<div>'+
                  `<div style='width:${pointWidth}px;text-align: center;position: absolute;left: -5px;color:${this.point.y<3?'black':'white'}'>${this.point.y}</div>` +
                '</div>';
                return this.point.y <1 ? null : results;
              }
            },
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
        categories: getFormattedData.dataLabels
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
        <div className={'ballot__results--barchart'}>
          <ChartTitleBarComponent {...{superTitle: null, title: 'Current Constituent Results'}}/>
          <StateDemographic stateCode={this.props.state_code} { ...this.state.repDemographics}/>
          <ChartLabelComponent { ...this.getFormattedData().textLabels}/>
          <BarChartComponent {  ...this.getSampleDistrictResultsArray()}/>
        </div>
        <div className={'ballot__results--barchart'}>
          <ChartTitleBarComponent {...{superTitle: 'votes', title: 'United State Results'}}/>
          <ChartLabelComponent { ...this.getFormattedData('usa').textLabels}/>
          <BarChartComponent {  ...this.getSampleDistrictResultsArray('usa')}/>
        </div>
      </div>
    )
  }
}

export default BallotResults;