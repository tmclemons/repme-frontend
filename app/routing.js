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
    }

  render() {
    return (
      <div id='app-wrapper' style={{display: 'inherit'}}>
        <Switch>
          <Route exact path='/vote/' component={Ballot}/>
          <Route exact path='/vote/export/:org/:zipcode' component={Ballot} />
          <Route exact path='/vote/:org?' component={Ballot}/>
          <Route component={Ballot} />
        </Switch>
      </div>
    )
  }
}

export default Routing;