import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

import Scss from './login.scss'

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleClick(event) {
    var apiBaseUrl = "http://localhost:3000/";
    var self = this;

    var payload = {
      "email": this.state.username,
      "password": this.state.password
    }

    axios.post(apiBaseUrl + 'login', payload)
      .then(function (response) {
        if (response.data.code == 200) {
          console.log("Login successful");
        }

        else if (response.data.code == 204) {
          console.warn("Username password do not match");
          alert("username password do not match")
        }
        else {
          console.warn("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  

  render() {
    return (
      <div className="login">
        <div className="top-aligner"></div>
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
        <div className="bottom-aligner"></div>
      </div>
    );
  }
}

export default LoginComponent;