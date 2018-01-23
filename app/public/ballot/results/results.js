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
import Scss from './results.scss';

class BallotResults extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      repDemographics: {
        state: this.props.user && this.props.user.state ? this.props.user.state : 'illinois',
        districtCity: this.props.user && this.props.user.city ? this.props.user.city : 'chicago',
        stateCode: this.props.state_code ? this.props.state_code : 'IL',
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
    let splitRange = data.value.split('-'); 
    let vote = data.comparableValue;
    if ( Number(splitRange[0]) <= vote ) {
      if (Number(splitRange[1]) >= vote) {
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
      return b.minOrder - a.minOrder;
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
          y: -30, 
          useHTML: true,
          formatter: function() {
            let pointWidth = Math.round(this.point.pointWidth);
            let results = 
              '<div>'+
                `<div style='width:${pointWidth}px;text-align: center;position: absolute;left: -5px;color:${this.point.y<3?'black':'white'}'>${this.point.y}</div>` +
              '</div>';
              return this.point.y < 1 ? null : results;
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
          enabled: true,
          useHTML: true,
          autoRotation: [0],
          align: 'left',
          formatter: function(){
            let positionTest = setVoteIconPosition({
              value: this.value,
              comparableValue: voteResult
            });
            let results;
            if (positionTest) {
              let barData = this.chart.series[0].data[this.pos];
              if (barData) {
                let pointWidth = Math.floor(barData.pointWidth);
                let positionLeft = -(pointWidth / 2);
                let pointHeight = pointWidth * 2.7;
                let positionTop = (-1 * pointHeight ) + 20;
                results = `<div style=" left: ${positionLeft}px; position: absolute; width: ${pointWidth}px; height:${pointHeight}px; top: ${positionTop}px; background-image:url('/images/yourVoteIcon.png'); background-size:cover; background-repeat: no-repeat">` +
                  '</div>';
              }
            } else {
              results = null;
            }
            return results;
          }
        },
        categories: getFormattedData.dataLabels
      }
    }
    return results;
  }

  convertResultsToPng(){
    let node = document.getElementById('your-results');
    domtoimage.toPng(node).then(function (dataUrl) {
      if(dataUrl){
        document.write(dataUrl)
      }
    }).catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
  }
  
  componentDidMount() {
    if (this.props.toImage) {
      setTimeout(() => {
        this.convertResultsToPng();
      }, 1000);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.bill.data !== nextProps.bill.data);
  }
  getStateDemographic = () => {
    if (this.props.showDemographics && !this.props.toImage) {
      return(
        <StateDemographic { ...this.state.repDemographics} />
      )
    }
    return null;
  }

  styles = {
    print: {
      display: `${this.props.toImage ? 'block' : 'none'}`,
      height: `${this.props.toImage ? '100px' : '0'}`,
      background: 'white'
    }
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
          <ChartTitleBarComponent {...{superTitle: null, title: this.props.resultsTitle}}/>
          {this.getStateDemographic()}
          <div id={'your-results'}>
            <div style={this.styles}/>
            <ChartLabelComponent { ...this.getFormattedData().textLabels}/>
            <BarChartComponent {  ...this.getSampleDistrictResultsArray()}/>
          </div>
        </div>
      </div>
    )
  }
}

export default BallotResults;