import React from 'react'
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


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
    emailLimit: PropTypes.number,
    vote_isValid: PropTypes.bool,
    defaultValue: PropTypes.number,
    modalOpen: PropTypes.bool,
    userIsSure: PropTypes.bool,
  }

  static defaultProps = {
    userEmail: '',
    zipCode: '',
    otherLegislationSubscribe: false,
    hotBillSubscribe: false,
    email_isValid: false,
    zip_isValid: false,
    emailLimit: 64,
    vote_isValid: false,
    defaultValue: 50,
    modalOpen: false,
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
      emailLimit: this.props.emailLimit,
      vote_isValid: this.props.vote_isValid,
      defaultValue: this.props.defaultValue,
      modalOpen: this.props.modalOpen,
      isDirty: false,
    }
  }

  submitThruModal = () => {
    if ( this.state.modalOpen ) {
      this.submitData({userIsSure: true});
      this.handleClose()
    }
  }
  
  submitThruForm = () => {
    this.setState({
      isDirty: true
    })
    if (this.state.email_isValid && this.state.zip_isValid) {
      this.submitData({userIsSure: true});
    } else {
      this.submitData({userIsSure: false});
    }
  } 

  submitData = (param) => {
    let dataSet = {
      userEmail: this.state.userEmail,
      zipCode: this.state.zipCode,
      otherLegislationSubscribe: this.state.otherLegislationSubscribe,
      hotBillSubscribe: this.state.hotBillSubscribe,
      userIsSure: ( param.userIsSure ? param.userIsSure : false )
    }
    //hack to rerender
    this.props.callback(dataSet);
    this.forceUpdate();
  }
  
  componentWillReceiveProps(nextProps) {
    if(!nextProps.debounce) {
      if (!this.state.modalOpen && (!nextProps.firstTimeUse && !nextProps.secondAttempt) ){
        if (!this.state.email_isValid || !this.state.zip_isValid) {
          this.setState({ modalOpen: true })
        }
      } 
    }
  }

  shouldComponentUpdate(nextProps) {
    return ( this.props.userEmail !== nextProps.userEmail || 
             this.props.zipCode !== nextProps.zipCode ||
             this.props.opt_in !== nextProps.opt_in ||
             this.props.opt_in_two !== nextProps.opt_in_two
            )
  }

  handleClose = () => {
    this.setState({ 
      modalOpen: false
     });
  };

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
        fontStyle: 'italic',
      },
      iconStyle: {
        marginRight: '10px',
        fill: 'rgb(0, 76, 135)'
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

    const actions = [
      <FlatButton
        label="Go Back"
        style={{
          color: 'rgb(0, 76, 135)'
        }}
        primary={true}
        onClick={this.handleClose}
      />,
      <RaisedButton
        buttonStyle={{
          backgroundColor: 'rgb(0, 76, 135)'
        }}
        label="No Thanks, Continue"
        primary={true}
        onClick={this.submitThruModal}
      />,
    ];

    return (
      <MuiThemeProvider>
        <div className={
          'vote__form'
        }>
        <Dialog
          title={this.props.copy.validationTitle}
          titleStyle={{
            textTransform: 'uppercase'
          }}
          actions={actions}
          modal={false}
          open={this.state.modalOpen}
          onRequestClose={this.handleClose}
        >
        {
          `${this.props.copy['validationPartOne']} ` +
          `${!this.state.email_isValid ? 'Email ' : ''}` +
          `${!this.state.email_isValid && !this.state.zip_isValid ? 
            ' or ' : ''}` +
          `${!this.state.zip_isValid ? 'Zip Code ' : ''}` +
          `${this.props.copy['validationPartTwo']}` 
        }
        </Dialog>

        { this.props.firstSubmission ? 
          <div>
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
                  errorText={this.props.copy[`emailInput${this.props.chamber}`]}
                  errorStyle={styles.errorStyle}
                  onChange={(event, newValue) => {
                    if (formValidation.emailValidation(newValue, this.state.emailLimit)) {
                      this.setState({ 
                        email_isValid: true,
                        userEmail: newValue
                      })} else {
                      this.setState({
                        email_isValid: false,
                        userEmail: ''
                      })
                      }
                    }
                  }
                /><br />
                <TextField
                  hintText="Zip Code"
                  errorText={this.props.copy[`zipCodeInput${this.props.chamber}`]}
                  errorStyle={styles.errorStyle}
                  onChange={(event, newValue) => {
                    if (formValidation.zipCodeValidation(newValue)) {
                      this.setState({
                        zip_isValid: true,
                        zipCode: newValue
                      })} else {
                        this.setState({
                          zip_isValid: false,
                          zipCode: ''
                        })
                      }
                    }
                  }
                /><br />
              </div>
            </div> : null 
          }
          
          <div className={
            `vote__form--subscribe ${this.props.firstSubmission ?
              '' :
              'resubmit'
            }
            `
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
                inputStyle={{
                  color: 'rgb(0, 76, 135)'
                }}
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
              onClick={this.submitThruForm} 
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default VoteForm;