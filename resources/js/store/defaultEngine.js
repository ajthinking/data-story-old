import createEngine, { DiagramModel, DefaultNodeModel } from '@projectstorm/react-diagrams';
import ManipulatorNodeFactory from '../ManipulatorNodeFactory'

var engine = createEngine();

engine.getNodeFactories().registerFactory(new ManipulatorNodeFactory());

var model = new DiagramModel();

var node1 = new DefaultNodeModel('___Users___', '#61dafb');
node1.setPosition(200, 100);
let port1 = node1.addOutPort('');

model.addAll(node1);

engine.setModel(model)

export default engine