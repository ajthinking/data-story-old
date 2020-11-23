import createEngine, { DiagramModel, DefaultNodeModel } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

let Diagram = () => {
	//1) setup the diagram engine
	var engine = createEngine();

	//2) setup the diagram model
	var model = new DiagramModel();

	//3-A) create a default node
	var node1 = new DefaultNodeModel('_____Users_____', '#61dafb');
	node1.setPosition(200, 100);
	let port1 = node1.addOutPort('');

	// //3-B) create another default node
	// var node2 = new DefaultNodeModel('_____Where_____', 'lightgray');
	// let port2 = node2.addInPort('In');
	// node2.setPosition(600, 200);

	// // link the ports
	// let link1 = port1.link(port2);

	// var input = new DefaultNodeModel('_____INPUT_____', '#61dafb');
	// input.setPosition(50, 100);

	// var output = new DefaultNodeModel('_____OUTPUT_____', '#61dafb');
    // output.setPosition(750, 200);
    
	// var error = new DefaultNodeModel('_____ERROR_____', 'darkgray');
	// error.setPosition(100, 300);    


	//4) add the models to the root graph
	model.addAll(node1, /*node2, output, error ,link1 */);

	//5) load model into engine
	engine.setModel(model);

    //6) render the diagram!
    
	return (
        <CanvasWidget engine={engine} className='fullsize bg-gray-600' />
	);
};

export default Diagram;