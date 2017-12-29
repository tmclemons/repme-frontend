import React from "react";
import Scss from "./sideComponentCard.scss";
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';

class SideComponentCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "John Doe",
        url: 'https://assets.materialup.com/uploads/bebad102-7f40-4941-99cd-54366113003e/avatar-08.png',
        email: 'johndoe@gmail.com'
      }
    }
  }
  render() {
    return (
      <List>
        <ListItem>
          <Avatar src={this.state.url}/>
        </ListItem>
        <ListItem>
          {this.state.user.name}
        </ListItem>
        <ListItem>
          {this.state.user.email}
        </ListItem>
      </List>
    )
  }
}

export default SideComponentCard;
