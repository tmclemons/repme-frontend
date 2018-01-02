import React from 'react';
import { Route } from 'react-router'
import AsyncComponent from 
  '../template/components/utilities/AsyncComponent';

//routes
const Bills = AsyncComponent( 
  () => import( './admin/bills/bills' )
)
const Organizations = AsyncComponent( 
  () => import( './admin/organizations/organizations' )
)
const RollCallList = AsyncComponent( 
  () => import( './admin/roll-call-list/rollCallList' )
)

class Routing extends React.Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Bills} />
        <Route path="/organizations" component={Organizations} />
        <Route path="/roll-call-list" component={RollCallList} />
      </div>
    )
  }
}

// TODO: need to add params pass through on routes
export default Routing;