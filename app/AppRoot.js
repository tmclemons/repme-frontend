import React from "react";
import { renderRoutes } from "react-router-config";

class AppRoot extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default AppRoot;