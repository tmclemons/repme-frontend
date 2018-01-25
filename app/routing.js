import React from 'react';
import { Route, Switch, Redirect } from 'react-router'
import AsyncComponent from 
  '../template/components/utilities/AsyncComponent';

//front end routes
const Ballot = AsyncComponent( 
  () => import( './public/ballot/ballot/ballot' ) )
  
  class Routing extends React.Component {
    constructor(props) {
      super(props);
      console.log(props)
    }

  render() {
    return (
      <div id='app-wrapper' style={{display: 'inherit'}}>
        <Switch>
          <Route exact path='/' component={Ballot}/>
          <Route exact path='/export/:org/:zipcode' component={Ballot} />
          <Route exact path='/:org?' component={Ballot}/>
          <Route component={Ballot} />
        </Switch>
      </div>
    )
  }
}

export default Routing;