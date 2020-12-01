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

        this.targetElouquentModel = options.targetElouquentModel ?? 'App\\Models\\User'
      
		this.addPort(
			new DefaultPortModel({
				in: false,
				name: 'out1',
			})
		);
    }
    
    getDisplayName() {
        let parts = this.targetElouquentModel.split('\\');
        return parts.pop() + 's' + " #" + this.serial
    }

	serialize() {
		return {
            ...super.serialize(),
            targetElouquentModel: this.targetElouquentModel
		};
	}

	deserialize(ob, engine) {
		super.deserialize(ob, engine);
	}
}