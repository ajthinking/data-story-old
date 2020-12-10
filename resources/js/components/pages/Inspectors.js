import React from 'react';
import Diagram from '../Diagram';
import { inject, observer } from "mobx-react"
import InspectorTable from '../InspectorTable';

@inject('store') @observer
export default class Inspectors extends React.Component {

    sample() {
        return {
            users: this.props.store.inspectables[0].features
        }
    }

    render() {
        let inspectables = this.props.store.nodesWithInspectables().reduce((result, node) => {
            result[node.getDisplayName()] = node.features;
            return result
        }, {})

        console.log(inspectables);


        return (
            <div className="mt-4 ml-4 border-l">
                <div className="flex w-full text-gray-100 font-mono text-xs border-b">
                    <div className="px-2 py-1 border-t border-r">Users</div>
                    <div className="px-2 py-1 border-t border-r">Problem Users</div>
                    <div className="px-2 py-1 border-t border-r">Dumped</div>
                </div>
                <div className="p-4">
                    <InspectorTable />    
                </div>
                
            </div>
        );

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

