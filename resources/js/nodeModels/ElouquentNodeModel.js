import { DefaultPortModel, NodeModel } from '@projectstorm/react-diagrams';
import ManipulatorNodeModel from './ManipulatorNodeModel';

/**
 * Example of a custom model using pure javascript
 */
export default class ElouquentNodeModel extends ManipulatorNodeModel {
	constructor(options = {}) {
		super({
			...options,
			type: 'manipulator'
		});
		this.color = options.color || { options: 'red' };

		// setup an in and out port
		this.addPort(
			new DefaultPortModel({
				in: true,
				name: 'in1'
			})
        );
		this.addPort(
			new DefaultPortModel({
				in: true,
				name: 'in2'
			})
		);        
		this.addPort(
			new DefaultPortModel({
				in: false,
				name: 'out1'
			})
		);
	}

	serialize() {
		return {
			...super.serialize(),
			color: this.options.color
		};
	}

	deserialize(ob, engine) {
		super.deserialize(ob, engine);
		this.color = ob.color;
	}
}