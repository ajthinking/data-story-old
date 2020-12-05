import { action, observable, makeObservable } from "mobx"
import ManipulatorNodeModel from '../nodeModels/ManipulatorNodeModel'
import { DefaultLinkModel } from '@projectstorm/react-diagrams'
import engine from './defaultEngine'
import manipulators from './manipulatorCatalogue'
import nodeModels from './nodeModels'
import _ from 'lodash'


export class Store {

    diagram = {
        engine,
        manipulators,
        refresh: 0,
        latestNode: null,
        nodeSerial: 1,
    }

    inspectables = []

    metadata = {
        running: false,
        page: 'StoryWorkbench',
    }

    constructor() {
        makeObservable(this, {
            diagram: observable,
            metadata: observable,
            inspectables: observable,
            
            addManipulator: action.bound,
            increaseNodeSerial: action.bound,
            refreshDiagram: action.bound,
            setInspectables: action.bound,
            setLatestNode: action.bound,
            setPage: action.bound,
            setResults: action.bound,
            setNotRunning: action.bound,
            setRunning: action.bound,
            setStory: action.bound,
            
        })
    }

    addManipulator(name) {
        let selected = nodeModels[name]

        var node = new selected({
           serial: this.diagram.nodeSerial++ 
        });

        node.setPosition(100, 100 + Math.random() * 100);

        let latestNode = this.diagram.latestNode

        if(this.diagram.engine.model.hasNode(latestNode)) {
            node.setPosition(latestNode.position.x+200, latestNode.position.y);
            let link = this.getAutomatedLink(latestNode, node)
            if(link) this.diagram.engine.model.addAll(link);
        }
        
        this.diagram.engine.model.addNode(node);
        this.setLatestNode(node)
        this.refreshDiagram()
    }

    getAutomatedLink(from, to) {
        if(!from) return
        // Ports
        let fromPort = Object.values(from.getOutPorts())[0] ?? false;
        let toPort = Object.values(to.getInPorts())[0] ?? false;

        // Ensure there are ports to connect to
        if(!fromPort || !toPort) return;
        
        // Links
        let link = new DefaultLinkModel()
        link.setSourcePort(fromPort);
        link.setTargetPort(toPort);            
        
        // track: https://github.com/projectstorm/react-diagrams/issues/617
        //link.addLabel(Math.floor(Math.random()*1000));

        // Report
        fromPort.reportPosition()
        toPort.reportPosition()

        return link
    }

    refreshDiagram() {
        this.diagram.refresh++        
    }

    increaseNodeSerial() {
        this.diagram.nodeSerial++        
    }

    setInspectables(inspectables) {
        this.inspectables = inspectables;
    }

    setLatestNode(node) {
        this.diagram.latestNode = node
    }
    
    setPage(name) {
        this.metadata.page = name
    }
    
    setResults(results) {
        this.results = results
    }

    setNotRunning() {
        this.metadata.running = false
    }

    setRunning() {
        this.metadata.running = true
    }

    setStory(name) {
        this.metadata.story = name
    }    
}
export default window.store = new Store