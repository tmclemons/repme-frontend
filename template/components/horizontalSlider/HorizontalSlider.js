import React from 'react';
import CustomSlider from '../customSlider/customSlider';
import Scss from './horizontalSlider.scss';

class Horizontal extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      value: this.props.defaultValue,
      changed: false,
      isValid: false,
      validationCount: 0
    }
  }

  handleChangeStart = () => {
    // console.log('Change event started')
  };

  handleChange = (value) => {
    this.setState({
      value: value,
      changed: true
    })
    this.props.callback(value, true)
  };
  
  handleChangeComplete = () => {
    // console.log('Change event completed')
  };

  render() {
    const { value, step } = this.state
    return (
      <div className='slider'>
        <CustomSlider
          min={this.props.min || 0}
          max={this.props.max || 100}
          value={this.state.value || 0}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
          firstTimeUse={this.props.firstTimeUse}
          secondAttempt={this.props.secondAttempt}
          changed={this.state.changed}
          labels={this.props.labels}
        />
      </div>
    )
  }
}

export default Horizontal
