import React from 'react'

class ChartLabelComponent extends React.Component {
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
          if (prop.length > 0) {
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

export default ChartLabelComponent;