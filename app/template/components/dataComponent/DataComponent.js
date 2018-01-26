import React from 'react';
import moment from 'moment';

class DataComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.type === "date") {
      return(
        <span>
          {
            moment(this.props.data)
              .format('YYYY-MM-DD')
          }
        </span>
      )
    } else {
      return(
        <span>
          {
            this.props.data
          }
        </span>
      )
    }
  }
}

export default DataComponent