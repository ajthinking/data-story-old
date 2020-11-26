import { action, observable, makeObservable } from "mobx"
import ManipulatorNodeModel from '../ManipulatorNodeModel'
import defaultEngine from './defaultEngine'


export class Store {

    diagram = {
        engine: defaultEngine,
        refresh: 0
    }

    metadata = {
        story: 'projects/data/units',
        page: 'StoryWorkbench',
        dummy: {
            counter: 0
        }
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

    addManipulator() {
        var node = new ManipulatorNodeModel({ color: 'rgb(192,255,0)' });
        node.setPosition(100, 100);
    
        this.diagram.engine.model.addNode(node);
        console.log(this.diagram.engine)
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