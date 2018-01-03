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
        marginBottom: 15,
      },
      errorStyle: {
        color: green500
      }
    };

    return (
      <MuiThemeProvider>
        <div className={
          'vote__form'
        }>

          <div className={
            'vote__form--text-input'
          }>
            <TextField
              hintText="Email Address"
              errorText="To receive results including final Senate Floor Votes"
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
              errorText="This will allow us to include your private ballot in the constituency that we will provide your Senators"
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
            <div>
              <Checkbox
                label="to receive other Hot Congressional Bill Ballots and track results"
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
            <div>
              <Checkbox
                label="to receive information from other Legislators and Bills and Ballot results"
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
              label="Submit" 
              primary={true} 
              style={null}
              onClick={this.formOnSubmit} 
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default VoteForm;