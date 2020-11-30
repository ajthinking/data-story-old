import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';

export default class ManipulatorNodeWidget extends React.Component {
	render() {
		return (
            <div className="font-mono text-xxs text-gray-200">
                <div className="flex-grow-0 w-32">
                    {this.renderHeading()}
                    {this.renderInPorts()}                  
                    {this.renderOutPorts()}
                </div>
            </div>
		);
    }

    renderHeading() {
        return (
            <div className="flex justify-between items-center pl-4 pr-2 py-1 border border-gray-900 font-bold rounded-lg bg-gray-700">
                <span>{this.props.node.getDisplayName()}</span>
                <i className="fas fa-cog"></i>
            </div>            
        )
    }
    
    renderInPorts() {
        return Object.values(this.props.node.getInPorts()).map((port) => {
            return (
                <PortWidget key={port.options.name} engine={this.props.engine} port={port}>
                    <div className="flex items-center text-gray-200 mx-2 py-1 px-4 border border-gray-900 rounded-lg bg-gray-500">
                        <div className="w-full">
                            <span>{port.options.label}</span>
                        </div>
                    </div>
                </PortWidget>
            )
        })
    }

    renderOutPorts() {
        return Object.values(this.props.node.getOutPorts()).map((port) => {
            return (
                <PortWidget key={port.options.name} engine={this.props.engine} port={port}>
                    <div className="flex items-center text-gray-200 mx-2 py-1 px-4 border border-gray-900 rounded-lg bg-gray-500">
                        <div className="w-full">
                            <span>{port.options.label}</span>
                        </div>
                    </div>
                </PortWidget> 
            )
        })
    }
}

