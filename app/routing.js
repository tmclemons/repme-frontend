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
const Login = AsyncComponent( 
  () => import( './public/login/login' )
)

class Routing extends React.Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Bills} />
        <Route exact path='/bills' component={Bills} />
        <Route path="/organizations" component={Organizations} />
        <Route path="/roll-call-list" component={RollCallList} />
        <Route path="/login" component={Login} />
      </div>
    )
  }
}

// TODO: need to add params pass through on routes
export default Routing;