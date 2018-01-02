import React from "react";
import Scss from "./sideComponentNav.scss";
import { List } from 'material-ui/List';
import AsyncNavLink from '../asyncNavLink/AsyncNavLink'

class SideComponentNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nav: [
        {
          name: 'Dashboard',
          path: 'action/dashboard',
          goTo: '/' 
        },
        {
          name: 'Bills',
          path: 'av/library-books',
          goTo: '/bills'
        },
        {
          name: 'Organizations',
          path: 'action/group-work',
          goTo: '/organizations'
        },
        {
          name: 'Roll Call List',
          path: 'action/face',
          goTo: '/roll-call-list'
        },
      ]
    }
  }

  
  render() {
    return (
      <List>
        {
          this.state.nav.map( (navItem, index) => {
            return (
              <AsyncNavLink 
                key={index}
                navLinkParameters={navItem}
              >
              </AsyncNavLink>
            )
        })}
      </List>
    )
  }
}

export default SideComponentNav;
