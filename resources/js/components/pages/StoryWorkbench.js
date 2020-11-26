import React from 'react';
import Diagram from '../Diagram';
import { inject } from "mobx-react"

@inject('store')
export default class StoryWorkbench extends React.Component {
    render() {
        return (
            <Diagram />
        );
    }
}

