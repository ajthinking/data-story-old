import createEngine, { DiagramModel, DefaultNodeModel } from '@projectstorm/react-diagrams';
import ManipulatorNodeFactory from '../nodeFactories/ManipulatorNodeFactory'

var engine = createEngine();

engine.getNodeFactories().registerFactory(new ManipulatorNodeFactory());

var model = new DiagramModel();

engine.setModel(model)

export default engine