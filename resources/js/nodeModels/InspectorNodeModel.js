import { DefaultPortModel, NodeModel as DefaultNodeModel } from '@projectstorm/react-diagrams';
import NodeModel from './NodeModel';

/**
 * Example of a custom model using pure javascript
 */
export default class InspectorNodeModel extends DefaultNodeModel {
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