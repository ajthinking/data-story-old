import { DefaultPortModel, NodeModel } from '@projectstorm/react-diagrams';
import ManipulatorNodeModel from './ManipulatorNodeModel';

/**
 * Example of a custom model using pure javascript
 */
export default class InspectorNodeModel extends ManipulatorNodeModel {
	constructor(options = {}) {
		super({
			...options,
			type: 'manipulator'
        });

        this.targetElouquentModel = options.targetElouquentModel ?? 'App\\Models\\User'

        this.runner =  'App\\DataStory\\Inspector'

		// setup an in and out port
		this.addPort(
			new DefaultPortModel({
				in: true,
				name: 'Input'
			})
        );
    }
    
    getDisplayName() {
        return 'Inspector' + " #" + this.serial
    }

	serialize() {
		return {
            ...super.serialize(),
            targetElouquentModel: this.targetElouquentModel,
            runner: this.runner,
		};
	}

	deserialize(ob, engine) {
		super.deserialize(ob, engine);
	}
}