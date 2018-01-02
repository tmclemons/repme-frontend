import React from 'react';
import { Route, IndexRoute } from 'react-router'
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


const RoutingInit = () => {
  return (
    <Route path="/" component={Bills}> 
      <IndexRoute component={Bills} />
      <Route path="/organizations" component={Organizations} />
      <Route path="/roll-call-list" component={RollCallList} />
    </Route>
    // <Bills />
  )
}

// TODO: need to add params pass through on routes
export default RoutingInit