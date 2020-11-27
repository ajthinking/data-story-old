import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import ManipulatorNodeModel from './ManipulatorNodeModel'
import ManipulatorNodeWidget from './ManipulatorNodeWidget'

export default class ManipulatorNodeFactory extends AbstractReactFactory {
	constructor() {
		super('manipulator');
	}

	generateModel(event) {
		return new ManipulatorNodeModel();
	}

	generateReactWidget(event) {
		return <ManipulatorNodeWidget engine={this.engine} node={event.model} />;
    }
}