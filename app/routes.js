import AppRoot from './AppRoot';
import Ballot from './public/ballot/ballot'

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