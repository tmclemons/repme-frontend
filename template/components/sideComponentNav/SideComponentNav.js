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
          import: 'ContentInbox',
          name: 'Inbox',
          path: 'content/inbox'
        },
        {
          import: 'ActionGrade',
          name: 'Starred',
          path: 'action/grade'
        },
        {
          import: 'ContentSend',
          name: 'Sent mail',
          path: 'content/send'
        },
        {
          import: 'ContentDrafts',
          name: 'Drafts',
          path: 'content/drafts'
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
