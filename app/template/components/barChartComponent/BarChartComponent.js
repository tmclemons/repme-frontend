import React from 'react';
import CreateChart from '../utilities/ChartsWrapperComponent';


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