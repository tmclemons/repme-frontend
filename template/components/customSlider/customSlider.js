import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * Predefined constants
 * @type {Object}
*/

const constants = {
  axis: {
    xAxis: {
      dimension: 'width',
      direction: 'left',
      reverse: 'right',
      coordinate: 'x'
    },
    yAxis: {
      dimension: 'height',
      direction: 'top',
      reverse: 'bottom',
      coordinate: 'y'
    }
  }
};

class CustomSlider extends React.Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
    axis: PropTypes.string,
    tooltip: PropTypes.bool,
    reverse: PropTypes.bool,
    labels: PropTypes.string,
    handleLabel: PropTypes.string,
    format: PropTypes.func,
    onChangeStart: PropTypes.func,
    onChange: PropTypes.func,
    onChangeComplete: PropTypes.func,
  }

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    axis: 'horizontal',
    tooltip: false,
    reverse: false,
    labels: {},
    handleLabel: ''
  }

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      limit: 0,
      grab: 0
    }
  }

  componentDidMount() {}

  /**
   * Format label/tooltip value
   * @param  {Number} - value
   * @return {Formatted Number}
   */
  handleFormat() {}

  /**
   * Update slider state on change
   * @return {void}
   */
  handleUpdate() {}

  /**
   * Attach event listeners to mousemove/mouseup events
   * @return {void}
   */
  handleOnStart() {}

  /**
   * Handle drag/mousemove event
   * @param  {Object} e - Event object
   * @return {void}
   */
  handleOnDrag() {}

  /**
   * Detach event listeners to mousemove/mouseup events
   * @return {void}
   */
  handleOnComplete() {}

  /**
   * Support for key events on the slider handle
   * @param  {Object} e - Event object
   * @return {void}
   */
  handleKeyPress() {}

  /**
   * Calculate position of slider based on its value
   * @param  {number} value - Current value of slider
   * @return {position} pos - Calculated position of slider based on value
   */
  getHandleCoordsFromValue = (value) => {
    const { limit } = this.state;
    const { min, max } = this.props;
    const differenceMaxMin = max - min;
    const differenceValMin = value - min;
    const factor = differenceValMin / differenceMaxMin;
    const position = Math.round(factor * limit);

    return position
  }

  /**
   * Translate position of slider to slider value
   * @param  {number} position - Current position/coordinates of slider
   * @return {number} value - Slider value
   */
  
  getValueFromHandleCoords = (position) => {
    const { limit } = this.state;
    const { orientation, min, max, step } = this.props;
    const factor = clamp(position, 0, limit);
    const position = Math.round(factor * limit);
    const baseValue = step * Math.round(factor * (max, min) / step);
    const value = axis === "xAxis" ? baseValue + min : max - baseValue; 
  
    return clamp(value, min, max)
  }


  /**
   * Grab coordinates of slider
   * @param  {Object} position - Position object
   * @return {Object} - Slider fill/handle coordinates
   */
  getHandleCoords = (position) => {
    const {limit, grab} = this.state;
    const { axis } = this.props;
    const value = this.getValueFromHandleCoords(position);
    const position = this.getHandleCoordsFromValue(value);
    const handleCoords = axis === "xAxis" ? position + grab : position;
    const fillPosition = axis === "xAxis" ? 
      handlePosition : 
      limit - handlePosition;

    return {
      fill: fillPosition,
      handle: handlePosition,
      label: handlePosition
    };
  }
  
  renderHandleLabels() {}

  render() {
    const {
      axis,
      className,
      labels,
      handleLabel,
      min,
      max,
      reverse,
      tooltip,
      value
    } = this.props;
    const { active } = this.state
    const getOrientationProps = constants.axis[axis];
    const dimension = getOrientationProps.dimension;
    const direction = reverse ? 
      getOrientationProps.reverse :
      getOrientationProps.direction ;
    


    return(
      <div>
        slider
      </div>
    )
  }

}

export default CustomSlider;