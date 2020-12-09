import React from 'react';
import { inject, observer } from "mobx-react"

@inject('store') @observer
export default class Toaster extends React.Component {
    render() {
        return (
            <div className="w-full bg-gray-500 text-malibu-600 font-mono">
                Story ran successfully!
            </div>
        );
    }
}