import React from 'react';
import { inject, observer } from "mobx-react"

import WorkbenchControl from './controls/WorkbenchControl';
import InspectorsControl from './controls/InspectorsControl';
import OpenControl from './controls/OpenControl';
import SaveControl from './controls/SaveControl';
import RunControl from './controls/RunControl';
import AddNodeControl from './controls/AddNodeControl'

@inject('store') @observer
export default class Toolbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            progressTick: 0
        }
    }

    render() {
        return (
            <div className="flex w-full bg-gray-600 border-t-2 border-gray-500 shadow shadow-xl">
                <div className="flex no-wrap items-center flex-1 w-full px-2 py-2">
                    <WorkbenchControl />
                    <OpenControl />
                    <SaveControl />
                    <RunControl />
                    <AddNodeControl />
                    {this.renderInspectables()}                   
                </div>
            </div>
        );
    }
    renderInspectables() {
        //this.props.store.diagram.refresh // Triggers update as diagram wont ... ????

        return (
            <span>
                {this.props.store.nodesWithInspectables().map(node => {
                    return (
                        <span
                            key={node.getDisplayName() + node.serial} 
                            className="ml-8 text-gray-200 hover:text-malibu-500 font-mono text-xs cursor-pointer">
                            {node.getDisplayName()}
                        </span>                        
                    )
                })}
            </span>
        );
    }
    
}