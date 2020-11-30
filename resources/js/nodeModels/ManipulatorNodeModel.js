import { DefaultPortModel, NodeModel } from '@projectstorm/react-diagrams';
import _ from 'lodash'

/**
 * Example of a custom model using pure javascript
 */
export default class ManipulatorNodeModel extends NodeModel {
	constructor(options = {}) {
		super({
			...options,
			type: 'manipulator'
		});
		this.color = options.color || { options: 'red' };
	}

	serialize() {
		return {
			...super.serialize(),
            color: this.options.color,
            dependencies: this.dependencies()
		};
	}

	deserialize(ob, engine) {
		super.deserialize(ob, engine);
		this.color = ob.color;
    }

    getInPorts() {
        return _.pickBy(this.getPorts(), function(port, key) {
            return port.options.in
        });
    }

    getOutPorts() {
        return _.pickBy(this.getPorts(), function(port, key) {
            return !port.options.in
        });        
    }
    
    dependencies() {
        let inPorts = Object.values(this.getInPorts())
        let linkLists = inPorts.map(port => port.links).flat()

        let links = linkLists.map(linkList => Object.values(linkList)).flat()

        let dependencies = links.map(link => link.sourcePort.parent)

        return dependencies
    }
}