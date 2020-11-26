import React from 'react';
import { inject, observer } from "mobx-react"

@inject('store') @observer
export default class Header extends React.Component {
    render() {
        return (
            <div className="w-full">
                <div className="w-full p-4 bg-gray-700 shadow shadow-lg">
                    <span className="text-xl text-malibu-500 font-mono">
                        DataStory
                        <span className="ml-4 text-sm text-gray-400">
                            {this.props.store.metadata.story}
                        </span>
                    </span>          
                </div>
            </div>
        );
    }
}