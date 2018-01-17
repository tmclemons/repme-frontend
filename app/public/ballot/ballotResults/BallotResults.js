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

import domtoimage from 'dom-to-image';
import Scss from './ballotResults.scss';
  
class BallotResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toImage: true, //this.props.toImage || false,
      yourState: 'IL',
      backgroundImg: {
        url: 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg'
      },
      repDemographics: {
        state: 'illinois',
        districtCity: 'chicago'
      }
    }
  }

  getColorStops = () => {

    let colorBuffer = [];
    colorStops.forEach((stop) => {
      colorBuffer.push(stop.hex)
    });

    return colorBuffer.length ? colorBuffer : null;
  }

  setVoteIconPosition(data) {
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
      title: 'none',
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

  convertResultsToPng(){
    let node = document.getElementById('your-results');
    let deleteResults = document.getElementById('delete-results');
    domtoimage.toPng(node).then(function (dataUrl) {
      //maybe a time issue because the chart hasnt drawn yet
      var img = new Image();
      img.src = dataUrl;
      img.className="results-image"
      document.body.appendChild(img);
      deleteResults.outerHTML = "";
    }).catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
  }
  
  componentDidMount() {
    console.log('mounted')
    if (this.props.toImage) {
      setTimeout(() => {
        console.log('did it run')
        this.convertResultsToPng();
      }, 1000);
    }
  }

  getStateDemographic = () => {
    let isZipCode = this.props.zip_code && this.props.zip_code.length > 0; //this.props.zip_code
    if(isZipCode) {
      return(
        <StateDemographic stateCode={this.props.state_code} { ...this.state.repDemographics} />
      )
    }
    return null;
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
          {this.getStateDemographic()}
          <div id={'your-results'}>
            <div style={{
              display: `${this.state.toImage ? 'block' : 'none'}`,
              height: `${this.state.toImage ? '100px' : '0'}`,
              background: 'white'
            }}/>
            <ChartLabelComponent { ...this.getFormattedData().textLabels}/>
            <BarChartComponent {  ...this.getSampleDistrictResultsArray()}/>
          </div>
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