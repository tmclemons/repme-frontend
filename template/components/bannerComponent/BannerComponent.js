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
      componentProps: 0,
      step: 5,
      max: 100,
      defaultValue: 0,
      ballotNumber: null,
      ballotTitle: null,
      ballotContent: null,
      ballotClosingDate: null,
    }
  }

  styleForOverlay = {
    width: '100%',
    height: '100%',
  }

  // capture slider data
  onValueChange = (data) => {
    this.setState({
      componentProps: (data / (this.state.step)) || 0
    })
  }

  componentDidMount() {
    console.log(this.props)
    if ( this.props && this.props.ballotInfo) {
      this.setState({
        ballotNumber: this.props.ballotInfo.number,
        ballotTitle: this.props.ballotInfo.title,
        ballotContent: this.props.ballotInfo.description,
        ballotClosingDate: this.props.ballotInfo.closing_date,
      })
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardMedia
              overlay={
                <div
                  className={classNames(
                    `slider__color--stop-${this.state.componentProps}`
                  )}
                >
                <div className={'overlay-content'}>
                  <div className={'main'}>
                    <div className={'icon'}>
                      <StarIcon color={ grey50 }/>
                    </div>
                    <span className={'bill-number'}>{this.state.ballotNumber}</span>
                    <h1>{this.state.ballotTitle || null}</h1>
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
              <img src="https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg" alt="" />
            </CardMedia>
          </Card>
        </MuiThemeProvider>
        <div className={'slider--horizontal'}>
          <HorizontalSlider
            step={this.state.step}
            max={this.state.max}
            defaultValue={this.state.defaultValue}
            callback={this.onValueChange}
          />
        </div>
      </div>
    )
  }
}

export default Banner;