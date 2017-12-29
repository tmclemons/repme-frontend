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
          path: 'action/dashboard'
        },
        {
          name: 'Bills',
          path: 'av/library-books'
        },
        {
          name: 'Organizations',
          path: 'action/group-work'
        },
        {
          name: 'Profile',
          path: 'action/face'
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
