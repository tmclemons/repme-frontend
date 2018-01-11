import React from "react";
import AsyncComponent from "../utilities/AsyncComponent"
import { ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';

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
      AsyncNavLinkItem ? 
      <Link to={this.props.navLinkParameters.goTo}>
        <ListItem 
        primaryText={this.props.navLinkParameters.name}
        leftIcon={<AsyncNavLinkItem />} 
        />
      </Link>
     : null
    )
  }
}

export default AsyncNavLink;