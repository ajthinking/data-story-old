import createEngine from '@projectstorm/react-diagrams';
import NodeFactory from '../NodeFactory'
import DiagramModel from '../DiagramModel'

var engine = createEngine();

engine.getNodeFactories().registerFactory(new NodeFactory());

var model = new DiagramModel();

engine.setModel(model)

export default engine