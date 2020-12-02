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
        
        this.serial = options.serial
    }

	serialize() {
		return {
            ...super.serialize(),
            incomingPortOrigins: this.incomingPortOrigins()
		};
    }

	deserialize(ob, engine) {
		super.deserialize(ob, engine);
    }

    getDiagramModel() {
        return this.parent.parent
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

    incomingPortOrigins() {
        return Object.values(this.getInPorts()).reduce((origins, port) => {
            origins[port.options.id] = Object.values(port.links).map(link => link.sourcePort.options.id)
            return origins
        }, {})
    }
    
    dependencies() {
        let cached = this.getDiagramModel().getCachedNodeDependencies(this.options.id)
        if(cached !== null) {
            return cached;
        }

        let inPorts = Object.values(this.getInPorts())
        let linkLists = inPorts.map(port => port.links).flat()
        let links = linkLists.map(linkList => Object.values(linkList)).flat()

        let dependencies = links.map(link => link.sourcePort.parent)

        let deepDependencies = dependencies.map(d => d.dependencies())

        let result = dependencies.concat(deepDependencies.flat())

        this.getDiagramModel().setCachedNodeDependencies(this.options.id, result)

        return result
    }

    dependsOn(n2) {
        return this.dependencies().map(d => d.options.id).includes(n2.options.id)
    }
}