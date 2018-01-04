import React from 'react'
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';


import formValidation from '../../components/utilities/formValidation';

import { green500, blue500 } from 'material-ui/styles/colors';
import Scss from './voteForm.scss';

class VoteForm extends React.Component {
  static propTypes = {
    userEmail: PropTypes.string,
    zipCode: PropTypes.string,
    otherLegislationSubscribe: PropTypes.bool,
    hotBillSubscribe: PropTypes.bool,
    zip_isValid: PropTypes.bool,
    email_isValid: PropTypes.bool,
    emailLimit: PropTypes.number
  }

  static defaultProps = {
    userEmail: '',
    zipCode: '',
    otherLegislationSubscribe: false,
    hotBillSubscribe: false,
    email_isValid: false,
    zip_isValid: false,
    emailLimit: 64
  }


  constructor(props) {
    super(props);

    this.state= {
      userEmail: this.props.userEmail,
      zipCode: this.props.zipCode,
      otherLegislationSubscribe: this.props.otherLegislationSubscribe,
      hotBillSubscribe: this.props.hotBillSubscribe,
      email_isValid: this.props.email_isValid,
      zip_isValid: this.props.zip_isValid,
      emailLimit: this.props.emailLimit
    }
  }

  formOnSubmit = () => {
    if (this.state.email_isValid && this.state.zip_isValid) {
      this.props.callback(
        {
          userEmail: this.state.userEmail,
          zipCode: this.state.zipCode,
          otherLegislationSubscribe: this.state.otherLegislationSubscribe,
          hotBillSubscribe: this.state.hotBillSubscribe,
        }
      )
      alert('Form is Submitted')
    } else {
      alert('Form is Invalid')
    }
  }

  render() {
    const styles = {
      checkbox: {
        marginBottom: 0,
      },
      errorStyle: {
        color: green500
      },
      labelStyle: {
        fontSize: '12px',
        lineHeight: '18px',
        fontStyle: 'italic'
      },
      iconStyle: {
        marginRight: '10px'
      },
      buttonStyle: {
        height: '50px',
      },
      buttonLabelStyle: {
        fontSize: '18px',
        margin: '20px',
        lineHeight: '50px',
        textTransform: 'capitalized',
        fontStyle: 'italic',
      }
    };

    return (
      <MuiThemeProvider>
        <div className={
          'vote__form'
        }>
          <div className={
            'vote__form--notice'
          }> 
            {this.props.copy.formNotice}
          </div>

          <div className={
            'vote__form--text-input'
          }>
            <TextField
              hintText="Email Address"
              errorText={this.props.copy.emailInput}
              errorStyle={styles.errorStyle}
              onChange={(event, newValue) => {
                if (formValidation.emailValidation(newValue, this.state.emailLimit)) {
                  this.setState({ 
                    email_isValid: true,
                    userEmail: newValue
                  })} else {
                  this.setState({
                    email_isValid: false
                  })
                  }
                }
              }
            /><br />
            <TextField
              hintText="Zip Code"
              errorText={this.props.copy.zipCodeInput}
              errorStyle={styles.errorStyle}
              onChange={(event, newValue) => {
                if (formValidation.zipCodeValidation(newValue)) {
                  this.setState({
                    zip_isValid: true,
                    zipCode: newValue
                  })} else {
                    this.setState({
                      zip_isValid: false
                    })
                  }
                }
              }
            /><br />
          </div>
          
          <div className={
            'vote__form--subscribe'
          }>
            <div className={'vote__form--subscribe--input'}>
              <div className={'vote__form--subscribe--input-title'}>
                <span>
                  {this.props.copy.subscribeToHotBillTitle}
                </span>
              </div>
              <Checkbox
                iconStyle={styles.iconStyle}
                label={this.props.copy.subscribeToHotBill}
                labelStyle={styles.labelStyle}
                style={styles.checkbox}
                onCheck={(event, checked) => {
                  if (checked) {
                    this.setState({
                      hotBillSubscribe: true
                    })
                  } else {
                      this.setState({
                        hotBillSubscribe: false
                      })
                  }
                }}
              />
            </div>
            <div className={'vote__form--subscribe--input'}>
              <div className={'vote__form--subscribe--input-title'}>
                <span>    
                  {this.props.copy.subscribeToOtherLegislationInfoTitle}
                </span>
              </div>
              <Checkbox
                iconStyle={styles.iconStyle}
                label={this.props.copy.subscribeToOtherLegislationInfo}
                labelStyle={styles.labelStyle}
                style={styles.checkbox}
                onCheck={(event, checked) => {
                  if (checked) {
                    this.setState({
                      otherLegislationSubscribe: true
                    })
                  } else {
                    this.setState({
                      otherLegislationSubscribe: false
                    })
                  }
                }}
              />
            </div>
          </div>
          <div className={
            'vote__form--submit'
          }>
            <RaisedButton 
              label={this.props.copy.submissionCTA} 
              primary={true} 
              labelStyle={styles.buttonLabelStyle}
              style={styles.buttonStyle}
              onClick={this.formOnSubmit} 
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default VoteForm;