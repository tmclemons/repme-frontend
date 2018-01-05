import React from 'react';
import CreateChart from '../utilities/ChartsWrapperComponent';
import Scss from './barChartComponent.scss';


class BarChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <CreateChart 
        chartType={'bar'}
        methodNames={['getBarsAtEvent']}
        { ...this.props}
      />
    )
  }
}

export default BarChart;