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
      }
    }
    this.chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    };

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
    let data = [ 
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

    data.forEach((dataItem, index) => {
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

  getSampleDistrictResultsArray = () => {
    let results = {
      title: null,
      chart: {
        type: 'column',
      },
      plotOptions: {
        series: {
          pointPadding: 0,
          colorsByPoint: true,
        },
      },
      colors: this.getColorStops(),
      series:[{
        data: this.getFormattedData().data,
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
        categories: this.getFormattedData().dataLabels
      }
    }
    return results;
  }

  submitVote(voteData) {
    //hook api post call here
    console.log(voteData)
  }

  randomScalingFactor = () => {
    return Math.round(this.Samples.rand(-100,
      100));
  };

  render() {
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const color = ChartJS.helpers.color;
    const barChartData = {
      labels: this.getSampleDistrictResultsArray().xAxis.categories,
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: color(this.chartColors.red).alpha(0.5).rgbString(),
        borderColor: this.chartColors.red,
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
        {/* <BarChart 
          data={barChartData}
          options={{
            responsive: true,
              legend: {
                display: false
              },
              title: {
                display: false,
              },
              scales: {
                xAxes: [{
                  gridLines: {
                    display: false
                  }
                }],
                yAxes: [{
                  display: false,
                  ticks: {
                    reverse: true,
                  },
                  gridLines: {
                    display: false
                  }
                }]
              },
            }
          }
          /> */}
        <div className={'ballot__results--barchart'}>
          <BarChartComponent { ...this.getSampleDistrictResultsArray()}/>
        </div>
        {/* <VoteForm callback={this.submitVote} copy={this.state.viewCopy} /> */}
        <Footer />
      </div>
    )
  }
}

export default BallotResults;