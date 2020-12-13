import createEngine from '@projectstorm/react-diagrams';
import NodeFactory from './NodeFactory'
import DiagramModel from './DiagramModel'

export default class EngineFactory {
    static loadOrCreate(serializedModel = null) {
        return serializedModel ? 'hahaha' : this.defaultEngine();
    }

    static defaultEngine() {        
        var engine = createEngine();
        
        engine.getNodeFactories().registerFactory(new NodeFactory());
        
        var model = new DiagramModel();
        
        engine.setModel(model)
        
        return engine        
    }


}