import { DefaultPortModel, NodeModel } from '@projectstorm/react-diagrams';
import ManipulatorNodeModel from './ManipulatorNodeModel';

/**
 * Example of a custom model using pure javascript
 */
export default class PassNodeModel extends ManipulatorNodeModel {
	constructor(options = {}) {
		super({
			...options,
			type: 'manipulator'
        });

		this.addPort(
			new DefaultPortModel({
				in: true,
				name: 'Input'
			})
        );

		this.addPort(
			new DefaultPortModel({
				in: false,
				name: 'Output'
			})
        );
        
        this.dataStoryAction =  'App\\DataStory\\Pass'
    }
    
    getDisplayName() {
        return 'Pass' + " #" + this.serial
    }

	serialize() {
		return {
            ...super.serialize(),
            dataStoryAction: this.dataStoryAction,
		};
	}

	deserialize(ob, engine) {
		super.deserialize(ob, engine);
	}
}