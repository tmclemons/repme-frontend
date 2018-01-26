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
        exact: true,
        component: Ballot
      },
      { path: '/export/:org/:zipcode',
        exact: true,
        component: Ballot
      }
    ]
  }
];

export default routes;