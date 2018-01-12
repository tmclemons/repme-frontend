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
  () => import( './public/ballot/ballot/ballot' ) )

class Routing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Route exact path='/' component={Ballot} />
        <Route exact path='/:org' component={Ballot} />
      </div>
    )
  }
}

// TODO: need to add params pass through on routes
export default Routing;