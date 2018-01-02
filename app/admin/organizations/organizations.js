import React from 'react';
import UiTemplateLayout from
  '../../../template/uiTemplateLayoutComponent/UiTemplateLayoutComponent';
//static data for building ui
import SampleData from '../../../static/organizations-sample'
import axios from 'axios';

class Organizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        {
          title: 'Org Name',
          key: 'name',
          type: 'string'
        },
        {
          title: 'Org Type',
          key: 'type',
          type: 'string'
        }
      ]
    }
  }


  componentDidMount() {
    axios.get(`http://54.187.193.156/orgs/`)
      .then(res => {
        this.setState({ results: res.data.results });
      });
  }

  render() {
    const dummyData = {
      state: this.state,
      routeTitle: 'Organizations',
      results: this.state.results || []
    }

    return (<UiTemplateLayout data={dummyData} />);
  }
}

export default Organizations