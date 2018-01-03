import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import { capitalize, clamp } from './customSliderUtils'


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

  componentDidMount() {
    this.getHandleUpdate()
    const resizeObserver = new ResizeObserver(this.getHandleUpdate)
    resizeObserver.observe(this.slider)

  }

  /**
   * Format label/tooltip value
   * @param  {Number} - value
   * @return {Formatted Number}
   */
  formatHandle = (value) => {
    const { format } = this.props
    return format ? format(value) : value
  }

  /**
   * Update slider state on change
   * @return {void}
   */
  getHandleUpdate = () => {
    if (!this.slider) {
      // for shallow rendering
      return
    }
    const { axis } = this.props
    const dimension = capitalize(constants.axis[axis].dimension)
    const sliderPos = this.slider[`offset${dimension}`]
    const handlePos = this.handle[`offset${dimension}`]

    this.setState({
      limit: sliderPos - handlePos,
      grab: handlePos / 2
    })
  }

  /**
   * Attach event listeners to mousemove/mouseup events
   * @return {void}
   */
  handleOnStart = (event) => {
    const { onChangeStart } = this.props
    document.addEventListener('mousemove', this.handleOnDrag)
    document.addEventListener('mouseup', this.handleOnComplete)
    this.setState(
      {
        active: true
      },
      () => {
        onChangeStart && onChangeStart(event)
      }
    )
  }

  /**
   * Handle drag/mousemove event
   * @param  {Object} event - Event object
   * @return {void}
   */
  handleOnDrag = (event) => {
    event.stopPropagation()
    const { onChange } = this.props
    const { target: { className, classList, dataset } } = event
    if (!onChange || className === 'customslider__labels') return

    let value = this.position(e)

    if (
      classList &&
      classList.contains('customslider__label-item') &&
      dataset.value
    ) {
      value = parseFloat(dataset.value)
    }

    onChange && onChange(value, event)
  }

  /**
   * Detach event listeners to mousemove/mouseup events
   * @return {void}
   */
  handleOnComplete = (event) => {
    const { onChangeComplete } = this.props
    this.setState(
      {
        active: false
      },
      () => {
        onChangeComplete && onChangeComplete(event)
      }
    )
    document.removeEventListener('mousemove', this.handleOnDrag)
    document.removeEventListener('mouseup', this.handleOnComplete)
  }

  /**
   * Support for key events on the slider handle
   * @param  {Object} event - Event object
   * @return {void}
   */
  handleKeyPress = (event) => {
    event.preventDefault()
    const { keyCode } = event
    const { value, min, max, step, onChange } = this.props
    let sliderValue

    switch (keyCode) {
      case 38:
      case 39:
        sliderValue = value + step > max ? max : value + step
        onChange && onChange(sliderValue, event)
        break
      case 37:
      case 40:
        sliderValue = value - step < min ? min : value - step
        onChange && onChange(sliderValue, event)
        break
    }
  }

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
    const { axis, min, max, step } = this.props;
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
  
  renderHandleLabels = (labels) => {
    <ul
      ref= { 
        data => {
        this.labels = data
      }}
      className = {
        classNames('customslider__labels')
      }
    >
      {labels}
    </ul>
  }

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
    const getAxisProps = constants.axis[axis];
    const dimension = getAxisProps.dimension;
    const direction = reverse ? 
      getAxisProps.reverse :
      getAxisProps.direction ;
    const position = this.getHandleCoordsFromValue(value);
    const coords = this.getHandleCoords(position);
    const fillStyle = { [dimension]: `${coords.fill}px` };
    const handleStyle = { [direction]: `${coords.handle}px` };
    let showTooltip = tooltip && active;
    let labelItems = [];
    let labelKeys = Object.keys(labels);
    
    if (labelKeys.length > 0) {
      
      labelKeys = labelKeys.sort(
        (oldValue, newValue) => 
          (reverse ? oldValue - newValue : newValue - oldValue)
      )

      for (let key of labelKeys) {
        const labelPosition = this.getHandleCoordsFromValue(key);
        const labelCoords = this.getHandleCoords(labelPosition)
        const labelStyle = { [direction]: `${labelCoords.label}px` }

        labelItems.push(
          <li
            key={key}
            className={classNames('customslider__label-item')}
            data-value={key}
            onMouseDown={this.handleOnDrag}
            onTouchStart={this.handleOnDrag}
            onTouchEnd={this.handleOnComplete}
            style={labelStyle}
          >
            {this.props.labels[key]}
          </li>
        )
      }
    }

    return (
      <div
        ref={data => {
          this.slider = data
        }}
        className={
          classNames(
          'customslider',
          `customslider-${axis}`,
          { 'customslider-reverse': reverse },
          className
        )}
        onMouseDown={this.handleOnDrag}
        onMouseUp={this.handleOnComplete}
        onTouchStart={this.handleOnStart}
        onTouchEnd={this.handleOnComplete}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-axis={axis}
      >
        <div className='customslider__fill' style={fillStyle} />
        <div
          ref={sh => {
            this.handle = sh
          }}
          className='customslider__handle'
          onMouseDown={this.handleOnStart}
          onTouchMove={this.handleOnDrag}
          onTouchEnd={this.handleOnComplete}
          onKeyDown={this.handleKeyPress}
          style={handleStyle}
          tabIndex={0}
        >
          {showTooltip
            ? <div
              ref={
                data => {
                this.tooltip = data
              }}
              className='customslider__handle-tooltip'
            >
              <span>{this.formatHandle(value)}</span>
            </div>
            : null}
          <div className='customslider__handle-label'>{handleLabel}</div>
        </div>
        {labels ? this.renderHandleLabels(labelItems) : null}
      </div>
    )
  }
}

export default CustomSlider;