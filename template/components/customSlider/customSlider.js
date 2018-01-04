import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import { capitalize, clamp } from './customSliderUtils';
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
    const position = Math.floor(factor * limit);
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

    //handle position tweaks
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
    let stepIcons = [];

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

    // if (stepIcons.length < 1 && steps > 1) {
    //   for (let index = 0; index < steps; index++) {
    //     stepIcons.push(
    //       <div 
    //         style={{
    //           width: `${
    //             this.getHandleCoordsFromValue((index + 1) * step) -
    //             this.getHandleCoordsFromValue((index) * step)
    //           }px`,
    //         }}
    //         key={index} 
    //         className={
    //           `step-icon-wrapper 
    //           ${ ((index ) % step) === 0  ? 'main-key' : ''}
    //           `
    //         }
    //       >
    //         <div className={'step-icon'}>
    //         </div>
    //       </div>
    //     );
    //   }
    // } else {
    //   stepIcons = null;
    // }

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
            <svg width="100%" height="100%" viewBox="0 0 236 116" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve"
              style={{
                fillRule:'evenodd', 
                clipRule:'evenodd',
                strokeLinejoin:'round',
                strokeMiterlimit:'1.41421'
              }}>
                <g transform="matrix(0.666667,0,0,0.666667,0,0)">
                  <path d="M74.32,15.298L273.572,15.589L320.549,85.836L273.426,154.048L74.029,153.32L21.961,84.964L74.32,15.298Z" 
                    style={{
                      fill:'rgb(1,86,146)'}} />
                  <path d="M278.662,76.383L278.662,94.563L287.534,85.109L278.662,76.383Z" 
                    style={{fill:'rgb(78,137,179)'}} />
                  <g transform="matrix(-1,0,0,1,340.765,0)">
                    <path d="M278.662,76.383L278.662,94.563L287.534,85.109L278.662,76.383Z" style={{fill:'rgb(78,137,179)'}} />
                  </g>
                  <g id="noun_39403_cc" transform="matrix(1.30552,0,0,1.30552,169.164,102.798)">
                    <g transform="matrix(1,0,0,1,-45,-56.25)">
                      <clipPath id="_clip1">
                        <rect x="0" y="0" width="90" height="112.5" />
                      </clipPath>
                      <g clipPath="url(#_clip1)">
                        <g>
                          <path d="M71.548,42.286C71.431,42.286 71.314,42.274 71.195,42.248C70.314,42.054 69.757,41.183 69.95,40.301C70.641,37.154 71.784,29.046 67.464,21.751C64.595,16.907 59.891,13.481 54.219,12.105C40.398,8.752 29.854,18.538 26.952,29.456L26.734,30.408C26.532,31.288 25.652,31.836 24.775,31.635C23.895,31.432 23.346,30.555 23.549,29.676L23.78,28.671C27.096,16.202 39.155,5.08 54.99,8.929C61.525,10.515 66.954,14.476 70.276,20.085C75.19,28.382 73.918,37.478 73.142,41.003C72.975,41.766 72.299,42.286 71.548,42.286Z" 
                            style={{fill:'white', fillRule:'nonzero', stroke:'white', strokeWidth:'1px' }}/>
                          <path d="M44.488,89.716C43.985,89.716 43.489,89.485 43.168,89.048C42.635,88.32 42.793,87.298 43.52,86.764C46.749,84.397 49.688,81.645 52.257,78.584C52.601,78.173 53.127,77.956 53.659,78.007C54.193,78.056 54.668,78.364 54.932,78.831C55.865,80.488 56.929,82.026 58.093,83.403C58.676,84.092 58.589,85.123 57.9,85.705C57.212,86.287 56.181,86.201 55.597,85.512C54.772,84.536 53.993,83.49 53.27,82.384C50.905,84.97 48.283,87.323 45.453,89.399C45.161,89.613 44.823,89.716 44.488,89.716Z" style={{fill:'white', fillRule:'nonzero', stroke:'white', strokeWidth:'1px' }}/>
                          <path d="M32.996,87.562C32.398,87.562 31.822,87.233 31.535,86.663C31.129,85.857 31.452,84.875 32.259,84.469C44.947,78.076 50.522,68.708 54.655,59.536C54.971,58.836 55.729,58.455 56.482,58.61C57.232,58.769 57.772,59.429 57.778,60.197C57.779,60.31 57.942,71.588 64.476,78.795C65.082,79.464 65.032,80.497 64.363,81.104C63.694,81.711 62.66,81.658 62.055,80.991C57.816,76.316 55.958,70.336 55.145,65.991C51.006,73.78 44.892,81.763 33.728,87.388C33.493,87.506 33.242,87.562 32.996,87.562Z" style={{fill:'white', fillRule:'nonzero', stroke:'white', strokeWidth:'1px' }}/>
                          <path d="M78.36,57.522C77.532,57.522 76.823,56.896 76.736,56.055C76.32,52.008 76.62,46.976 77.558,42.25L77.592,42.082C78.499,37.98 79.971,27.474 74.213,17.753C70.257,11.073 63.814,6.361 56.068,4.483C37.4,-0.058 23.232,12.922 19.374,27.441L19.039,28.895C18.236,32.994 16.603,36.841 14.2,40.278C13.684,41.018 12.667,41.198 11.925,40.68C11.185,40.163 11.005,39.144 11.523,38.404C13.664,35.343 15.118,31.914 15.844,28.212L16.204,26.653C20.474,10.583 36.162,-3.722 56.842,1.307C65.449,3.393 72.618,8.643 77.027,16.087C83.379,26.811 81.777,38.307 80.793,42.753L80.767,42.886C79.89,47.306 79.607,51.984 79.99,55.721C80.083,56.618 79.429,57.421 78.532,57.513C78.472,57.52 78.416,57.522 78.36,57.522Z" style={{fill:'white', fillRule:'nonzero', stroke:'white', strokeWidth:'1px' }}/>
                          <path d="M73.529,68.175C72.985,68.175 72.452,67.904 72.142,67.408C66.808,58.895 69.056,44.801 69.872,40.683L69.913,40.475C70.635,37.258 71.819,29.104 67.465,21.749C64.596,16.906 59.892,13.48 54.22,12.103C40.398,8.747 29.855,18.54 26.953,29.455L26.735,30.407C24.633,41.112 18.625,48.105 13.956,52.076C13.269,52.661 12.236,52.577 11.652,51.89C11.067,51.202 11.15,50.171 11.838,49.587C16.11,45.953 21.609,39.556 23.539,29.726L23.782,28.669C27.094,16.203 39.152,5.082 54.99,8.929C61.525,10.515 66.954,14.476 70.276,20.085C75.228,28.446 73.909,37.595 73.112,41.14L73.077,41.323C72.539,44.038 70.095,57.988 74.912,65.675C75.391,66.439 75.16,67.447 74.394,67.927C74.125,68.095 73.825,68.175 73.529,68.175Z" 
                            style={{fill:'rgb(255,248,248)', fillRule:'nonzero', stroke:'white', strokeWidth:'1px'}} />
                          <path d="M69.05,75.307C68.604,75.307 68.159,75.126 67.837,74.769C58.417,64.354 60.742,46.394 62.179,39.156L62.224,38.921C62.655,37.045 63.755,30.882 60.716,25.749C58.907,22.696 56.021,20.614 52.37,19.728C43.298,17.535 36.53,23.97 34.535,31.471L34.433,31.918C31.133,48.722 19.694,57.958 14.929,61.146C14.178,61.646 13.163,61.446 12.662,60.697C12.16,59.947 12.361,58.932 13.111,58.43C17.537,55.469 28.162,46.89 31.236,31.238L31.362,30.686C33.779,21.595 42.029,13.858 53.14,16.553C57.667,17.652 61.259,20.257 63.528,24.085C67.087,30.096 66.043,36.904 65.429,39.552L65.383,39.794C64.337,45.064 61.598,63.002 70.26,72.579C70.866,73.248 70.814,74.282 70.144,74.887C69.833,75.167 69.44,75.307 69.05,75.307Z" style={{fill:'white', fillRule:'nonzero', stroke:'white', strokeWidth:'1px' }}/>
                          <path d="M27.204,81.626C26.576,81.626 25.977,81.262 25.707,80.649C25.344,79.823 25.719,78.859 26.544,78.495C50.163,68.103 54.47,37.767 54.511,37.461C54.521,37.391 54.534,37.32 54.553,37.252C54.564,37.21 55.727,32.703 53.963,29.737C53.236,28.516 52.109,27.735 50.52,27.348C44.265,25.832 42.201,33.174 42.116,33.488C38.237,53.256 24.594,64.146 18.91,67.904C18.157,68.402 17.144,68.195 16.646,67.443C16.148,66.69 16.355,65.677 17.107,65.179C22.449,61.647 35.268,51.416 38.934,32.75C39.949,28.92 43.802,22.355 51.29,24.174C53.751,24.771 55.597,26.086 56.779,28.083C59.085,31.975 57.946,37.144 57.737,37.99C57.413,40.315 52.731,70.545 27.862,81.489C27.647,81.582 27.424,81.626 27.204,81.626Z" style={{fill:'white', fillRule:'nonzero', stroke:'white', strokeWidth:'1px' }}/>
                          <path d="M20.586,75.325C19.958,75.325 19.358,74.96 19.089,74.347C18.726,73.521 19.101,72.556 19.927,72.194C41.612,62.663 46.889,34.875 46.941,34.595C47.101,33.709 47.95,33.122 48.84,33.279C49.727,33.44 50.317,34.289 50.156,35.177C49.938,36.387 44.538,64.947 21.242,75.186C21.029,75.28 20.806,75.325 20.586,75.325Z" style={{fill:'white', fillRule:'nonzero', stroke:'white', strokeWidth:'1px' }}/>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
            </svg>
        </div>
          {
            showTooltip
            ? <div
              ref={
                toolTipData => {
                this.tooltip = toolTipData
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