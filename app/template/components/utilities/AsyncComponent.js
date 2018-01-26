import React, { Component } from "react";

export default function AsyncComponent(importCallback) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        getComponent: null
      };
    }

    async componentDidMount() {
      const { default: getComponent } = await importCallback();

      this.setState({
        component: getComponent
      });
    }

    render() {
      const CreatedComponent = this.state.component;

      return CreatedComponent 
        ? <CreatedComponent {...this.props} /> 
        : null;
    }
  }

  return AsyncComponent;
}