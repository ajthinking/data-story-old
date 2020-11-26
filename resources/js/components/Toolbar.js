import React from 'react';
import { inject, observer } from "mobx-react"

import StoryWorkbenchControl from './controls/StoryWorkbenchControl';
import InspectorsControl from './controls/InspectorsControl';
import RunControl from './controls/RunControl';
import AddManipulatorControl from './controls/AddManipulatorControl'

@inject('store') @observer
export default class Toolbar extends React.Component {
    render() {
        let navigation = [
            "fas fa-project-diagram",
            "fas fa-table",  
            "fas fa-cog",
        ];

        let controls = [
            "fas fa-play",
            "fas fa-plus",       
            "fas fa-folder-open",       
            "fab fa-github",        
        ]

        return (
            <div className="flex w-full bg-gray-600 border-t-2 border-gray-500 shadow shadow-xl">
                <div className="px-2 py-2">
                    <StoryWorkbenchControl />
                    <InspectorsControl />
                    <RunControl />
                    <AddManipulatorControl />
                </div>               
            </div>
        );
    }
}