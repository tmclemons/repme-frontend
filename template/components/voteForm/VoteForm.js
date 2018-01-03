import React from 'react'
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500, blue500 } from 'material-ui/styles/colors';
import Scss from './voteForm.scss';

class VoteForm extends React.Component {
  constructor(props) {
    super(props);
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
            // onChange={(event, newValue) => this.setState({ username: newValue })}
            /><br />
            <TextField
              hintText="Zip Code"
              errorText="This will allow us to include your private ballot in the constituency that we will provide your Senators"
              errorStyle={styles.errorStyle}
            // onChange={(event, newValue) => this.setState({ username: newValue })}
            /><br />
          </div>
          <div className={
            'vote__form--subscribe'
          }>
            <div>
              <Checkbox
                label="to receive other Hot Congressional Bill Ballots and track results"
                style={styles.checkbox}
              />
            </div>
            <div>
              <Checkbox
                label="to receive information from other Legislators and Bills and Ballot results"
                style={styles.checkbox}
              />
            </div>
          </div>
          <div className={
            'vote__form--submit'
          }>
            <RaisedButton label="Submit" primary={true} style={null} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default VoteForm;