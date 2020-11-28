import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';

export default class ManipulatorNodeWidget extends React.Component {
	render() {
		return (
            <div className="font-mono text-xxs text-gray-200">
                <div className="flex-grow-0 w-32">
                    <div className="flex justify-between items-center pl-4 pr-2 py-1 border border-gray-900 font-bold rounded-lg bg-gray-700">
                        <span>Route</span>
                        <i className="fas fa-cog"></i>
                    </div>
                    <PortWidget className="" engine={this.props.engine} port={this.props.node.getPort('in1')}>
                        <div className="flex items-center text-gray-200 mx-2 py-1 px-4 border border-gray-900 rounded-lg bg-gray-500">
                            <div className="w-full"><span className="">input 1</span></div>
                        </div>
                    </PortWidget>
                    <PortWidget className="" engine={this.props.engine} port={this.props.node.getPort('in2')}>
                        <div className="flex items-center text-gray-200 mx-2 py-1 px-4 border border-gray-900 rounded-lg bg-gray-500">
                            <div className="w-full"><span className="">input 2</span></div>
                        </div>
                    </PortWidget>

                    <PortWidget engine={this.props.engine} port={this.props.node.getPort('out1')}>
                        <div className="flex items-center text-gray-200 mx-2 py-1 px-4 border border-gray-900 rounded-lg bg-gray-500">
                            <div className="w-full"><span className="">output 1</span></div>
                        </div>
                    </PortWidget>                    
                </div>
            </div>
		);
	}
}

