import { DiagramModel } from '@projectstorm/react-diagrams'

/**
 * Sorts model in execution order based on their dependencies
 * Can attach data to links
 */
export default class DataStoryDiagramModel extends DiagramModel {

    serialize() {
        return {
            ...super.serialize(),
            executionTree: this.executionTree()
        }
    }

    executionTree(nodeId = null) {
        return {
            cool: 'ok'
        }
    }
}

/*
* Links have data
* A Node can get port data by requesting it from the corresponding port connections

[A, B, C, D, E, F]
*/