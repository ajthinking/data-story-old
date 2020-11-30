import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
var Mousetrap = require('mousetrap');

@inject('store') @observer
export default class ManipulatorSearch extends React.Component {    
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    render() {
        return (
        <div className="flex flex-col bg-gray-100 -m-5 rounded shadow max-w-xl font-mono text-xs">
            <input
                value={this.state.search}
                onChange={this.searchChange.bind(this)}
                ref={(input) => { this.nameInput = input; }}
                className="w-full p-4 rounded mb-4"
                placeholder="model | method | reader | writer ..."
                tabIndex={1}
            />
            <ul className="divide-y divide-gray-300">
                {this.filteredManipulators().map(manipulator => {
                    return this.renderManipulator(manipulator)
                })}
            </ul>
      </div>
      )
    }

    renderManipulator(manipulator) {
        const elementDataProperties = {
            'data-node-model-diagram-node-type' : manipulator.nodeModel,
            'data-node-model-elouquent-class'      : 'User',
            'data-node-model-elouquent-model-id'   : '1',
        }

        return (
            

            <li 
                key={manipulator.category + manipulator.name}
                onDoubleClick={this.handleSelect.bind(this)}
                //data-node-model={'InspectorNodeModel'}
                //data-node-model-argument={{target: 'Users'}}

                {...elementDataProperties}

                className="py-3 flex"
                tabIndex={2}
            >
                <div className="ml-3">
                <p className="text-sm mb-2 font-medium text-gray-900 text-bold">
                    <span className="text-indigo-500">{manipulator.category}</span>
                    <span className="">::{manipulator.name}</span>
                    
                </p>
                <p className="text-xs text-gray-500">
                    
                    <span className="ml-2">{manipulator.example}</span>
                </p>
                </div>
            </li>             
        )
    }

    searchChange(event) {
        this.setState({
            search: event.target.value
        })       
    }

    filteredManipulators() {
        return this.props.store.diagram.manipulators.filter((manipulator) => {
            let content = manipulator.category + manipulator.name + manipulator.help
            return content.toLowerCase().includes(
                this.state.search.toLowerCase()
            )
        })
    }

    componentDidMount(){
        this.nameInput.focus();

        Mousetrap.bind(
            'enter',
            this.handleSelect.bind(this)
        );        
    }
    
    handleSelect(event) {
        let prefix = 'data-node-model-'

        // Get relevant data properties as object { 0: data-key-x }
        let dataAttributes = _.pickBy(event.target.attributes, function(value, key) {
            return (value.name ?? false) && value.name.startsWith(prefix)
        })

        let options = Object.values(dataAttributes).reduce(
            (results, attribute) => {
                let optionName = attribute.name.replace(prefix, '')
                return {
                    ...results,
                    [optionName]: event.target.getAttribute(attribute.name)
                }
            }, {})

        this.props.store.addManipulator(
            options['diagram-node-type']
        )

        event.preventDefault()   
        this.props.onFinish()
    }
}