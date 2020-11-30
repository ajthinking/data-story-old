import { action, observable, makeObservable } from "mobx"
import ManipulatorNodeModel from '../nodeModels/ManipulatorNodeModel'
import engine from './defaultEngine'
import manipulators from './manipulatorCatalogue'
import nodeModels from './nodeModels'


export class Store {

    diagram = {
        engine,
        manipulators,
        refresh: 0,
    }

    metadata = {
        page: 'StoryWorkbench',
    }

    constructor() {
        makeObservable(this, {
            diagram: observable,
            metadata: observable,
            
            addManipulator: action.bound,
            setPage: action.bound,
            setStory: action.bound,
        })
    }

    addManipulator(name) {
        let selected = nodeModels[name]

        var node = new selected();

        node.setPosition(100, 100);
        
        this.diagram.engine.model.addNode(node);
        
        this.diagram.refresh++
    }
    
    setPage(name) {
        this.metadata.page = name
    }    

    setStory(name) {
        this.metadata.story = name
    }    
}
export default window.store = new Store