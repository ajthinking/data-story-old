import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'

@inject('store') @observer
export default class ManipulatorSearch extends React.Component {    
    render() {
        return (
        <div className="flex flex-col bg-gray-100 -m-5 rounded shadow max-w-xl font-mono text-xs">
            <input
                ref={(input) => { this.nameInput = input; }}
                className="w-full p-4 rounded mb-4"
                placeholder="invoker"
                tabIndex={1}
            />
            <ul className="divide-y divide-gray-300">
            <li className="py-3 flex" tabIndex={2}>
                <div className="ml-3">
                <p className="text-sm font-medium text-gray-900"><span className="text-indigo-500">Invoker</span>::Route</p>
                <p className="text-sm text-gray-500">Route::get('/your-route') ...</p>
                </div>
            </li>
        
            <li className="py-3 flex" tabIndex={3}>
                <div className="ml-3">
                <p className="text-sm font-medium text-gray-900"><span className="text-indigo-500">Invoker</span>::Artisan</p>
                <p className="text-sm text-gray-500">php artisan your:command ...</p>
                </div>
            </li>
        
            <li className="py-3 flex" tabIndex={4}>
                <div className="ml-3">
                <p className="text-sm font-medium text-gray-900"><span className="text-indigo-500">Invoker</span>::Event</p>
                <p className="text-sm text-gray-500">UserDeleted::class ...</p>
                </div>
            </li>
        
            <li className="py-3 flex">
                <div className="ml-3">
                <p className="text-sm font-medium text-gray-900"><span className="text-green-500">ElouquentModel</span>::PropertyInvokement</p>
                <p className="text-sm text-gray-500">PropertyInvokement::query() ...</p>
                </div>
            </li>    
        
            <li className="py-3 flex">
                <div className="ml-3">
                <p className="text-sm font-medium text-gray-900"><span className="text-red-500">Custom</span>::Invoke Contract</p>
                <p className="text-sm text-gray-500">Invoke and existing contract</p>
                </div>
            </li>        
            </ul>
      </div>
      )
    }

    componentDidMount(){
        this.nameInput.focus();
      }    
}