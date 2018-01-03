import React from 'react'
import CustomSlider from '../customSlider/customSlider'

class Horizontal extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      value: 0,
      step: 5,
    }
  }

  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    this.setState({
      value: value
    })
    this.props.callback(value)
  };

  handleChangeComplete = () => {
    console.log('Change event completed')
  };

  render() {
    const { value, step } = this.state
    return (
      <div className='slider'>
        <CustomSlider
          min={0}
          max={100}
          value={value}
          step={step}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
        <div className='value'>{value}</div>
      </div>
    )
  }
}

export default Horizontal
