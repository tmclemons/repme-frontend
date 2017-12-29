import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
//static data for building ui
import sampleData from '../../../static/bills-sample'

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        {
          title: 'Bill Number',
          key: 'number'
        },
        {
          title: 'Title',
          key: 'title'
        },
        {
          title: 'Chamber',
          key: 'chamber'
        },
        {
          title: 'Created On',
          key: 'created_on'
        }
      ]
    }
  }

  render() {
    // dummy data placholder
    const results = sampleData.results;
    console.log(results)

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
                          {result[field.key]}
                        </TableRowColumn>
                      )
                    })
                  }
                </TableRow>
              )
            })
          }
          {/* <TableRow>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>John Smith</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>2</TableRowColumn>
            <TableRowColumn>Randal White</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>3</TableRowColumn>
            <TableRowColumn>Stephanie Sanders</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>Steve Brown</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>5</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow> */}
        </TableBody>
      </Table>
    )
  }
}

export default TableComponent;