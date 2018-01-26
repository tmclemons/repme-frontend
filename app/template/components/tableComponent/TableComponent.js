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

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {
              this.props.data.state.fields.map( (field, index) => {
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
            this.props.data.results.map( (result, index) => {
              return (
                <TableRow key={index}>
                  {
                    this.props.data.state.fields.map( (field, subIndex) => {
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