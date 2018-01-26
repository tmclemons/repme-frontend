import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import DemocraticLogo from '../../components/utilities/DemocraticLogo';
import RepublicanLogo from '../../components/utilities/RepublicanLogo';
import Scss from './representativeCardComponent.scss';
 
class RepCard extends React.Component {
  constructor(props) {
    super(props)
  }

  toCapitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getPartyLogo = () => {
    if (this.props.party === 'democratic') {
      return (
        <DemocraticLogo />
      )
    }
    if (this.props.party === 'republican') {
      return (
        <RepublicanLogo />
      )
    }
  }

  render() {
    const Component = this.props.component;
    return (
      <MuiThemeProvider>
        <Paper className={'rep__card'}
          style={{
            boxSizing: 'unset',
            backgroundColor: `${this.props.voted ? 'green' : 'red'}`
          }}
          zDepth={2}>
          <div className={'rep__card--profile'}>
            <div className="rep__card--profile-title">
              <span className={'rep__card--profile-position'}>
                {this.props.position}
              </span>
              <span>{this.props.firstName}</span>
              <span>{this.props.lastName}</span>
            </div>
            <div
              className="rep__card--profile-profile-img"
              style={{ backgroundImage: `url(${this.props.profileImg})` }}
            >
            </div>
            <div className="rep__card--profile-profile-description">
              <div className={'rep__card--profile-party-icon'}>
                {this.getPartyLogo()}
              </div>
              <span>{`${this.toCapitalize(this.props.party)} Party`}</span>
              <span>-</span>
              <span>
                {
                  `Member of the U.S. ${this.toCapitalize(this.props.body)} 
                  from ${this.toCapitalize(this.props.state)}'s
                  ${this.props.district}th District`
                }
              </span>
            </div>
          </div>
          <div className={'rep__card--vote-data'}>
            <div className={'rep__card--voted'}>
              <div>voted for this bill</div>
              <i className={`${this.props.voted ? 'ion-checkmark' : 'ion-close'}`}></i>
            </div>
            <div className={'rep__card--voting-divider'}></div>
            <div className={'rep__card--voting-parity'}>
              <div>
                {`In the Past: Voted`}
              </div>
              <div className={'rep__card--voting-parity-amount'}>
                {`${((this.props.votingParity / 1) * 100 || 0)}%`}
              </div>
              <div>
                {`of the times on the same side as you!`}
              </div>
            </div>
            <div className="rep__card--voting-state">
              <div className="rep__card--voting-state-wrapper">
                <Component />
              </div>
            </div>
          </div>
        </Paper>
      </MuiThemeProvider>

    )
  }
}

class RepresentativeCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Component = this.props.component
    return(
    <div>
      <div className="rep_card--wrapper">
        {
          this.props.votes.map((vote, index) => {
            return (
              <RepCard component={Component} key={index} { ...vote} />
            )
          })
        }
      </div>
    </div>
    )
  }
}
export default RepresentativeCard;