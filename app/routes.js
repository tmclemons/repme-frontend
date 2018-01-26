// import React from 'react';
// import { Route, Switch, Redirect } from 'react-router'
import AppRoot from './AppRoot';
import Ballot from './public/ballot/ballot/ballot'


// //front end routes
// const Ballot = AsyncComponent( 
//   () => import( './public/ballot/ballot/ballot' ) )
  
//   class Routing extends React.Component {
//     constructor(props) {
//       super(props);
//       console.log(props)
//     }

//   render() {
//     return (
      // <div id='app-wrapper' style={{display: 'inherit'}}>
//         <Switch>
//           <Route exact path='/' component={Ballot}/>
//           <Route exact path='/export/:org/:zipcode' component={Ballot} />
//           <Route exact path='/:org?' component={Ballot}/>
//           <Route component={Ballot} />
//         </Switch>
      {/* </div> */}
//     )
//   }
// }

// export default Routing;

const routes = [
  { component: AppRoot,
    routes: [
      { path: '/',
        exact: true,
        component: Ballot
      },
      { path: '/:org?',
        component: Ballot
      },
      { path: '/export/:org/:zipcode',
        component: Ballot
      }
    ]
  }
];

export default routes;