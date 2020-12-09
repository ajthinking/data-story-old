import { action, observable, makeObservable } from "mobx"
import { DefaultLinkModel } from '@projectstorm/react-diagrams'
import engine from './defaultEngine'
import nodeModels from './nodeModels'
import _ from 'lodash'


export class Store {

    diagram = {
        engine,
        availableNodes: window.dataStoryCapabilities.availableNodes,
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
            
            addNode: action.bound,
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

    nodesWithInspectables() {
        return this.diagram.engine.model.getNodes().filter(phpNode => {
            return phpNode.features
        })
    }

    addNode(data) {
        console.log(data)
        let nodeType = nodeModels[data.nodeReact]

        var node = new nodeType({
           serial: this.diagram.nodeSerial++,
           ...data
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
        setTimeout(() => {
            this.metadata.running = false
        }, 500)
    }

    setRunning() {
        this.metadata.running = true
    }

    setStory(name) {
        this.metadata.story = name
    }    
}
export default window.store = new Store