import React from 'react';
import { Route } from 'react-router'
import AsyncComponent from 
  '../template/components/utilities/AsyncComponent';

//front end routes
const BallotVote = AsyncComponent( 
  () => import( './public/ballot/ballotVote/BallotVote' )
)
const BallotResults = AsyncComponent( 
  () => import( './public/ballot/ballotResults/BallotResults' )
)

// admin routes
const Bills = AsyncComponent( 
  () => import( './admin/bills/bills' )
)
const Organizations = AsyncComponent( 
  () => import( './admin/organizations/organizations' )
)
const RollCallList = AsyncComponent( 
  () => import( './admin/roll-call-list/rollCallList' )
)
// authentication
const Login = AsyncComponent( 
  () => import( './public/login/login' )
)

class Routing extends React.Component {
  render() {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Route exact path='/' component={BallotVote} />
        <Route path='/vote' component={BallotVote} />
        <Route path='/results' component={BallotResults} />
        <Route path='/bills' component={Bills} />
        <Route path="/organizations" component={Organizations} />
        <Route path="/roll-call-list" component={RollCallList} />
        <Route path="/login" component={Login} />
      </div>
    )
  }
}

// TODO: need to add params pass through on routes
export default Routing;