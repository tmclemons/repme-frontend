import React from 'react'
import CustomSlider from '../customSlider/customSlider'

class Horizontal extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      value: 10
    }
  }

  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  handleChangeComplete = () => {
    console.log('Change event completed')
  };

  render() {
    const { value } = this.state
    return (
      <div className='slider'>
        <CustomSlider
          min={0}
          max={100}
          value={value}
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
