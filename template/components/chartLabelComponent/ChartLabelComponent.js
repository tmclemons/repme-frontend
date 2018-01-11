import React from 'react'
import Scss from './chartLabelComponent.scss'

class ChartLabelComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let labels = [];
    let keys = Object.keys(this.props.labels);
    this.props.labels.forEach((label, index) => {
      if (label) {
        labels.push(
          <div key={index} style={label.styles}><span>{label.copy}</span></div>
        )
      }
    });
    return <div style={this.props.style} className={'vote-labels'}>{labels}</div>;
  }
}

export default ChartLabelComponent;