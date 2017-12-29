import React from "react";
import AsyncComponent from "../utilities/AsyncComponent"
import { ListItem } from 'material-ui/List';

class AsyncNavLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const AsyncNavLinkItem =
      AsyncComponent(() => 
      import(
        `material-ui/svg-icons/${this.props.navLinkParameters.path}`
      ));

    return ( 
      AsyncNavLinkItem ? <ListItem 
      primaryText={this.props.navLinkParameters.name}
      leftIcon={<AsyncNavLinkItem />} 
     /> : null
    )
  }
}

export default AsyncNavLink;