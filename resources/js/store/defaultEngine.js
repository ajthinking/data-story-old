import createEngine from '@projectstorm/react-diagrams';
import ManipulatorNodeFactory from '../nodeFactories/ManipulatorNodeFactory'
import DataStoryDiagramModel from '../DataStoryDiagramModel'

var engine = createEngine();

engine.getNodeFactories().registerFactory(new ManipulatorNodeFactory());

var model = new DataStoryDiagramModel();

engine.setModel(model)

export default engine