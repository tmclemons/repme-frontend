import React from 'react';
import UiTemplateLayout from
  '../../../template/uiTemplateLayoutComponent/UiTemplateLayoutComponent';
//static data for building ui
import SampleData from '../../../static/organizations-sample'

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

  render() {

    const dummyData = {
      state: this.state,
      routeTitle: 'Organizations',
      results: SampleData.results
    }
    
    return (
      <UiTemplateLayout data={dummyData} />
    )
  }
}

export default Organizations