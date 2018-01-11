import React from 'react';
import Scss from './titleBarComponent.scss';

class ChartTitleBarComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'chart-title'}>
        <div className={'divider'}></div>
        <div className={'content'}>
          <div>{this.props.superTitle || null}</div>
          <h2 className={`${this.props.superTitle ? 'with-super' : ''}`}>{this.props.title || null}</h2>
        </div>
        <div className={'divider'}></div>
      </div>
    )
  }
}

export default ChartTitleBarComponent;