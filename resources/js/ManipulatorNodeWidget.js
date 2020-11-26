import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';

export default class ManipulatorNodeWidget extends React.Component {
	render() {
		return (
			<div className="bg-malibu-500 p-4">
                New Manipulator
				<PortWidget engine={this.props.engine} port={this.props.node.getPort('in')}>
					<div className="h-4 bg-yellow-300" />
				</PortWidget>
				<PortWidget engine={this.props.engine} port={this.props.node.getPort('out')}>
                    <div className="h-4 bg-red-300" />
				</PortWidget>
				<div className="custom-node-color" style={{ backgroundColor: this.props.node.color }} />
			</div>
		);
	}
}