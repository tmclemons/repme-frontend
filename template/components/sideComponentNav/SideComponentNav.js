import React from "react";
import Scss from "./sideComponentNav.scss";

import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts'

//need to pass in properties for navigation including links
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
        {this.state.nav.map( (navItem, i) => {
          return (
            <ListItem 
              key={i}
              primaryText={navItem.name}
              leftIcon={} 
            >
            </ListItem>
          )
        })}
      </List>
    )
  }
}

{/* <List>
  <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
  <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
  <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
  <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
  <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
</List> */}
export default SideComponentNav;
