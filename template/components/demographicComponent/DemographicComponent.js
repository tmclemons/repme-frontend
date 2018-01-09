import React from 'react';
import Scss from './demographicComponent.scss';


class StateDemographic extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const Component = this.props.component;
    return (
      <div>
        <div className="demo_data">
          <div className="demo_data--data">
            <div className='demo_data--data-point'>
              <span>State:</span>
              <div>{this.props.state}</div>
            </div>
            <div className='demo_data--data-point'>
              <span>your District:</span>
              <div>{this.props.districtCity}</div>
            </div>
          </div>
          <div className="demo_data--icon">
            <Component />
          </div>
        </div>
      </div>
    )
  }
}


export default StateDemographic;