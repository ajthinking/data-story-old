import { DiagramModel } from '@projectstorm/react-diagrams'

/**
 * Sorts model in execution order based on their dependencies
 * Can attach data to links
 */
export default class DataStoryDiagramModel extends DiagramModel {

    cachedNodeDependencyMap = {
        // id1: [d1, d2, ...]
    }

    getCachedNodeDependencies(id) {
        return this.cachedNodeDependencyMap[id] ?? null
    }

    setCachedNodeDependencies(id, dependencies) {
        this.cachedNodeDependencyMap[id] = dependencies
    }

    clearCachedNodeDependencies() {
        this.cachedNodeDependencyMap = {}
    }

    serialize() {
        return {
            ...super.serialize(),
        }
    }

    hasNode(node) {
        return Boolean(
            node?.options?.id &&
            this.getNode(node.options.id)
        )        
    }

    executionOrder() {
        this.clearCachedNodeDependencies();

        return this.getNodes().sort(function(n1, n2) {

            if (n2.dependsOn(n1)) {
                return -1;
            }

            if (n1.dependsOn(n2)) {
              return 1;
            }

            return 0;
          });
    }
}

/*
* Links have data
* A Node can get port data by requesting it from the corresponding port connections

[A, B, C, D, E, F]
*/