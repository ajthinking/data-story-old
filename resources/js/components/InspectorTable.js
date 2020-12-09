import React from 'react';
import Diagram from './Diagram';
import { inject, observer } from "mobx-react"

@inject('store') @observer
export default class InspectorTable extends React.Component {

    sample() {
        return {
            users: [
                {
                    name: 'Anders',
                    age: 15,
                },
                {
                    name: 'Anders',
                    age: 15,
                },
                {
                    name: 'Anders',
                    age: 15,
                },
                {
                    name: 'Anders',
                    age: 19,
                },
                {
                    name: 'Anders',
                    age: 15,
                },                                                                
            ]
        }
    }

    render() {

        //console.log('INSPECTABLES', this.props.store.inspectables[0].features)

        return (
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        {this.renderTableHead()}
                        {this.renderTableBody()}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
        );
    }

    renderTableHead() {
        let headers = this.getHeaders()

        return (
            <thead>
            <tr>
                {this.getHeaders().map(heading => {
                    return (
                        <th key={heading} scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {heading}
                        </th>
                    )
                })}
            </tr>
          </thead>            
        )
    }

    renderTableBody() {
        return (
            <tbody>
                {this.getRows().map((row, rowIndex) => {
                    return (
                        <tr key={rowIndex} className="bg-white">
                            {row.map((column, columnIndex) => {
                                return (
                                    <td key={columnIndex} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                        {column}
                                    </td>                            
                                )
                            })}
                        </tr>
                    )
                })}

                
            </tbody>
        )
    }

    getHeaders() {
        return Object.keys(this.sample().users[0])
    }

    getRows() {
        return this.sample().users.map(user => {
            return Object.values(user)
        })
    }
}

