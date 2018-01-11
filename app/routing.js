import React from 'react';
import { Route } from 'react-router'
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
  () => import( './public/ballot/ballot/ballot' )
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

/// sample api routing 
///<Route path='/:id' component={BallotVote} />

class Routing extends React.Component {
  render() {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Route exact path='/' component={Ballot} />
        <Route path='/resubmit' component={BallotResubmit} />
        <Route path='/vote' component={BallotVote} />
        <Route path='/results' component={BallotResults} />
      </div>
    )
  }
}

// TODO: need to add params pass through on routes
export default Routing;