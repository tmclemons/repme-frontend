import React from 'react';
import ReactHighCharts from 'react-highcharts';

class BarChartComponent extends React.Component {
  constructor(props) {
    super(props);
    //passing in data set
    this.config = { 
      results: this.props
    }
  }

  componentDidMount() {
    //update chart data after render
  }
  
  render() {
    return (
      <div>
        <ReactHighCharts config={this.props}/>
      </div>
    )
  }
}

export default BarChartComponent;
