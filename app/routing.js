import React from 'react';
import { Route, Switch } from 'react-router'
import AsyncComponent from 
  '../template/components/utilities/AsyncComponent';

//front end routes
const BallotVote = AsyncComponent( 
  () => import( './public/ballot/ballotVote/BallotVote' )
)

const BallotResubmit = AsyncComponent(
  () => import('./public/ballot/ballotResubmit/BallotResubmit')
)

const BallotResults = AsyncComponent( 
  () => import( './public/ballot/ballotResults/BallotResults' )
)

const Ballot = AsyncComponent( 
  () => import( './public/ballot/ballot/ballot' ) )

class Routing extends React.Component {
  constructor(props) {
    super(props);
  }
  //TODO:setup redirect for when user hits reload
  render() {
    return (
      <div id='app-wrapper' style={{display: 'inherit'}}>
        <Switch>
          <Route exact path='/' component={Ballot} />
          <Route exact path='/:org?' component={Ballot} />
          <Route exact path='/export/:org/:zipcode' component={Ballot} />
        </Switch>
      </div>
    )
  }
}

// TODO: need to add params pass through on routes
export default Routing;