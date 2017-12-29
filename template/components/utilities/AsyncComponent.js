import React from 'react';

class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      component: null
    };
  }

  async componentDidMount() {
    const { default: component } = await importCallback();

    this.setState({
      component: component
    });
  }
  
  render() {
    const ImportedComponent = this.state.component;
    return ImportedComponent ? <ImportedComponent {...this.props} /> : null;
  }
}

export default function AsyncComponent(importCallback)