import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import classNames from 'classnames';
import HorizontalSlider from
  '../horizontalSlider/HorizontalSlider';
import DataComponent from '../dataComponent/DataComponent';
import StarIcon from 'material-ui/svg-icons/toggle/star';

import { grey50 } from 'material-ui/styles/colors';
import Scss from './bannerComponent.scss';

class Banner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      max: 100,
      defaultValue: this.props.defaultValue,
      ballotNumber: null,
      ballotTitle: null,
      ballotContent: null,
      ballotClosingDate: null,
      firstTimeUse: this.props.firstTimeUse,
      secondVoteAttempt: this.props.secondVoteAttempt
    }
  }

  styleForOverlay = {
    width: '100%',
    height: '100%',
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      firstTimeUse: this.props.firstTimeUse,
      secondVoteAttempt: this.props.secondVoteAttempt
    })
  }

  componentDidMount() {
    if ( this.props && this.props.ballotInfo) {
      this.setState({
        ballotNumber: this.props.ballotInfo.number,
        ballotTitle: this.props.ballotInfo.title,
        ballotContent: this.props.ballotInfo.description,
        ballotClosingDate: this.props.ballotInfo.closing_date,
      })
    }
  }

  toggleFirstTimeUser = () => {
    this.setState({firstTimeUse: false});
  }

  getFormattedData = () => {
    let dataLabels = [
      'Strongly Disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly Agree',
    ];

    return {
      dataLabels: dataLabels
    };
  }

  render() {
    let overflowCheck = false;
    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardMedia
              mediaStyle={
                {
                  maxHeight: '500px',
                  minHeight: '500px',
                  overflow: 'hidden',
                  backgroundImage: `url(${this.props.backgroundImg.url})`,
                  backgroundSize: 'cover'
                }
              }
              overlay={
                <div
                  className={classNames(
                    `${this.state.firstTimeUse ? 'overlay first-time-use' : 'slider__color--stop-' + this.props.bannerProps}`
                  )}
                >
                <div className={'overlay-content'}>
                  <div className={'main'}>
                    <div className={'icon'}>
                      <StarIcon color={ grey50 }/>
                    </div>
                    <span className={'bill-number'}>{this.state.ballotNumber}</span>
                      {/* TODO: come back and fix this for text-overflow */}
                      <h1 ref={(elem) => {return null}}>{this.state.ballotTitle || null}</h1>
                    <span className={'closing-date'}
                      >Ballot Closing Date:&emsp; 
                        <DataComponent
                          data={this.state.ballotClosingDate || null}
                          type={'date'}
                        />
                    </span>
                  </div>
                  <div className={'divider'}></div>
                  <div className={'subtitle'} 
                    dangerouslySetInnerHTML={{ __html: this.state.ballotContent || null }}>
                  </div>
                </div>

                </div>
              }
              overlayContainerStyle={this.styleForOverlay}
              overlayContentStyle={this.styleForOverlay}
            >
            <div></div>
            </CardMedia>
          </Card>
        </MuiThemeProvider>
          <div>
            {
              this.props.showSlider ?   
                <div className={'slider--horizontal'}>
                <HorizontalSlider
                  max={this.state.max}
                  defaultValue={this.state.defaultValue}
                  callback={this.props.callback}
                  toggleFirstTimeUser={
                    {
                      callback: this.toggleFirstTimeUser,
                      firstTimeUse: this.state.firstTimeUse,
                    }
                  }
                  secondAttempt={this.state.secondVoteAttempt}
                  labels={ this.getFormattedData().dataLabels }
                />  
                </div>: null
            }
          </div>
      </div>
    )
  }
}

export default Banner;