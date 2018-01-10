import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import { capitalize, clamp } from './customSliderUtils';
import SliderIconComponent from '../utilities/SliderIconComponent';
import Scss from './customslider.scss';


/**
 * Predefined constants
 * @type {Object}
*/

const constants = {
  axis: {
    horizontal: {
      dimension: 'width',
      direction: 'left',
      reverse: 'right',
      coordinate: 'x'
    },
    vertical: {
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
    labels: PropTypes.object,
    handleLabel: PropTypes.string,
    format: PropTypes.func,
    onChangeStart: PropTypes.func,
    onChange: PropTypes.func,
    onChangeComplete: PropTypes.func,
    firstUser: PropTypes.bool
    
  }

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    axis: 'horizontal',
    tooltip: true,
    reverse: false,
    labels: {},
    handleLabel: '',
    firstUser: false
  }

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      limit: 0,
      grab: 0,
      firstUser: false,
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
      limit: sliderPos - (handlePos),
      grab: (handlePos / 2)
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
    
    let value = this.getPosition(event)
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
   * @param  {number} coords - Current position/coordinates of slider
   * @return {number} value - Slider value
   */
  
  getValueFromHandleCoords = (coords) => {
    const { limit } = this.state;
    const { axis, min, max, step } = this.props;
    const factor = clamp(coords, 0, limit) / (limit || 1);
    const position = Math.round(factor * limit);
    const baseValue = step * Math.round(factor * (max - min) / step);
    const value = axis === "horizontal" ? baseValue + min : max - baseValue; 

    return clamp(value, min, max)
  }


  /**
   * Calculate position of slider based on value
   * @param  {Object} event - Event object
   * @return {number} value - Slider value
   */

  getPosition = (event) => {
    const { grab } = this.state
    const { axis, reverse } = this.props

    const node = this.slider
    const constantsAxis = constants.axis[axis];
    const coordinateStyle = constantsAxis.coordinate;
    const directionStyle = reverse
      ? constantsAxis.reverse
      : constantsAxis.direction;
    const clientCoordinateStyle = `client${capitalize(coordinateStyle)}`;
    const coordinate = !event.touches
      ? event[clientCoordinateStyle]
      : event.touches[0][clientCoordinateStyle];
    const direction = node.getBoundingClientRect()[directionStyle];
    const position = reverse
    ? direction - coordinate - grab
    : coordinate - direction - grab;
    const value = this.getValueFromHandleCoords(position);
    return value
  }


  /**
   * Grab coordinates of slider
   * @param  {Object} coords - Position object
   * @return {Object} - Slider fill/handle coordinates
   */
  getHandleCoords = (coords) => {
    const {limit, grab} = this.state;
    const { axis } = this.props;
    const value = this.getValueFromHandleCoords(coords);
    const position = this.getHandleCoordsFromValue(value);
    const handleCoords = axis === "horizontal" ? position + grab : position;
    const fillPosition = axis === "horizontal" ? 
      handleCoords : 
      limit - handleCoords;

    return {
      fill: fillPosition,
      handle: handleCoords,
      label: handleCoords
    };
  }
  
  renderHandleLabels = (labels) => {
    <ul
      ref= { 
        labelData => {
        this.labels = labelData
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
      step,
      value
    } = this.props;
    const { active } = this.state
    const steps = (max - min) / step;
    const getAxisProps = constants.axis[axis];
    const dimension = getAxisProps.dimension;
    const direction = reverse ? 
      getAxisProps.reverse :
      getAxisProps.direction ;
    const position = this.getHandleCoordsFromValue(value);
    const coords = this.getHandleCoords(position);
    const fillStyle = { [dimension]: `${coords.fill}px` };
    const handleStyle = { [direction]: `${coords.handle}px` };
    let showTooltip = tooltip;
    let labelItems = [];
    let labelKeys = Object.keys(labels);
    // let stepIcons = [];
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
            onTouchStart={this.handleOnStart}
            onTouchEnd={this.handleOnComplete}
            style={labelStyle}
          >
            {this.props.labels[key]}
          </li>
        )
      }
    }

    const GetTooltip = () => {
      if(this.props.firstTimeUse) {
        return(
          <div className={'label'}>
            <span>Touch or Click the thumbprint &amp; drag it to cast your vote</span>
            <div className={'slider-hint'}>
              <i className={'ion-arrow-left-b'}></i>
              <span>Slide to cast</span>
              <i className={'ion-arrow-right-b'}></i>
            </div>
          </div>
        )
      } else {
        return(
          <div className={'label'}>
            <span>My</span>
            <span>Vote</span>
          </div>
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
        aria-orientation={axis}
      > 
        {/* {
          <div className={'step-container'}>
            {          
              stepIcons.map((icon) => {
                return(icon)
              })
            }
          </div>
        } */}
        <div className='customslider__fill' style={fillStyle} />
        <div
          ref={
            handleData => {
            this.handle = handleData
          }}
          className='customslider__handle'
          onMouseDown={this.handleOnStart}
          onTouchMove={this.handleOnDrag}
          onTouchEnd={this.handleOnComplete}
          onKeyDown={this.handleKeyPress}
          style={handleStyle}
          tabIndex={0}
        >
        <div className={'thumb-button'}>
          <SliderIconComponent />
        </div>
          {
            showTooltip
            ? <div
              ref={
                toolTipData => {
                this.tooltip = toolTipData
              }}
                className={
                  `customslider__handle-tooltip 
                    ${this.props.firstTimeUse ? 'first-time-use' : ''}`
                }
            >
              {/* <span>{this.formatHandle(value)}</span> */}
              <GetTooltip />
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