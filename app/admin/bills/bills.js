import React from 'react';
import UiTemplateLayout from
  '../../../template/uiTemplateLayoutComponent/UiTemplateLayoutComponent';
//static data for building ui
import SampleData from '../../../static/bills-sample';

class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        {
          title: 'Bill Number',
          key: 'number',
          type: 'string'
        },
        {
          title: 'Title',
          key: 'title',
          type: 'string'
        },
        {
          title: 'Chamber',
          key: 'chamber',
          type: 'string'
        },
        {
          title: 'Created On',
          key: 'created_on',
          type: 'date'
        }
      ]
    }
  }
  
  render() {
  
    const dummyData = {
      state: this.state,
      routeTitle: 'Bills',
      results: SampleData.results
    }

    console.log(dummyData)
    return (
      <UiTemplateLayout data={dummyData}/>
    )
  }
}

export default Bills