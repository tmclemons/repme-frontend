import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DataComponent from '../dataComponent/DataComponent'
//static data for building ui
import sampleData from '../../../static/bills-sample'

class TableComponent extends React.Component {
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
    // dummy data placholder
    const results = sampleData.results;

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {
              this.state.fields.map( (field, index) => {
                return (
                  <TableHeaderColumn key={index}>
                    {field.title}
                  </TableHeaderColumn>
                )
              })
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            results.map( (result, index) => {
              return (
                <TableRow key={index}>
                  {
                    this.state.fields.map( (field, subIndex) => {
                      return (
                        <TableRowColumn key={subIndex}>
                          <DataComponent 
                            data={result[field.key]}
                            type={field.type}
                          />
                        </TableRowColumn>
                      )
                    })
                  }
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    )
  }
}

export default TableComponent;