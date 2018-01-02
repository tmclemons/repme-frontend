import React from 'react';
import UiTemplateLayout from
  '../../../template/uiTemplateLayoutComponent/UiTemplateLayoutComponent';
//static data for building ui
import SampleData from '../../../static/roll-call-list-sample'

class RollCallList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        {
          title: 'Question',
          key: 'question',
          type: 'string'
        },
        {
          title: 'Legislation Number',
          key: 'legis_num',
          type: 'string'
        },
        {
          title: 'Total Yea',
          key: 'total_yea',
          type: 'number'
        },
        {
          title: 'Total Nay',
          key: 'total_nay',
          type: 'number'
        },
        {
          title: 'Vote Result',
          key: 'vote_result',
          type: 'string'
        },
        {
          title: 'Vote Type',
          key: 'vote_type',
          type: 'string'
        },
        {
          title: 'Vote Time',
          key: 'vote_timestamp',
          type: 'date'
        }
      ]
    }
  }

  render() {
    const dummyData = {
      state: this.state,
      routeTitle: 'Roll Call',
      results: SampleData.results
    }

    return (
      <UiTemplateLayout data={dummyData} />

    )
  }
}

export default RollCallList