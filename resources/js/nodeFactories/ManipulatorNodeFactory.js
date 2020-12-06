import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import NodeModel from '../nodeModels/NodeModel'
import ManipulatorNodeWidget from '../nodeWidgets/ManipulatorNodeWidget'

export default class ManipulatorNodeFactory extends AbstractReactFactory {
	constructor() {
		super('manipulator');
	}

	generateModel(event) {
		return new NodeModel();
	}

	generateReactWidget(event) {
        let Widget = event.model

		return <ManipulatorNodeWidget engine={this.engine} node={event.model} />;
    }
}