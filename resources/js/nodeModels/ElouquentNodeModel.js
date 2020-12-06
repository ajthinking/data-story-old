import { DefaultPortModel, NodeModel as DefaultNodeModel } from '@projectstorm/react-diagrams';
import NodeModel from './NodeModel';

/**
 * Example of a custom model using pure javascript
 */
export default class ElouquentNodeModel extends DefaultNodeModel {
	constructor(options = {}) {
		super({
			...options,
			type: 'manipulator'
        });

        this.runner =  'App\\DataStory\\EloquentReader'

        this.targetElouquentModel = options.targetElouquentModel ?? 'App\\Models\\User'
    }
    
    getDisplayName() {
        let parts = this.targetElouquentModel.split('\\');
        return parts.pop() + 's' + " #" + this.serial
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