import React from "react";
import { renderRoutes } from "react-router-config";

class AppRoot extends React.Component {
  render() {
    return (
      <div>
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}

export default AppRoot;