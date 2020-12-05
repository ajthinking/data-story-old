import React from 'react';
import Diagram from '../Diagram';
import { inject, observer } from "mobx-react"

@inject('store') @observer
export default class Inspectors extends React.Component {
    render() {
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
                <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                Jane Cooper
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Regional Paradigm Technician
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                jane.cooper@example.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Admin
                </td>
            </tr>
            </tbody>
        )
    }

    getHeaders() {
        return this.props.store.results.inspectors.users.map(user => {
            return Object.keys(user)
        }).flat()
    }

    getRows() {
        return this.props.store.results.inspectors.users.map(user => {
            return Object.values(user)
        }).flat()
    }
}

