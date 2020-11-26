import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';

@inject('store') @observer
export default class StoryWorkbenchControl extends BaseControl {
    constructor(props) {
        super(props);
        this.title = 'Story workbench'
        this.icon = 'fas fa-project-diagram'
        this.page = 'StoryWorkbench'
    }



    onClick()
    {
        this.props.store.setPage('StoryWorkbench')
    }

    style() {
        let style = super.style()
        if(this.page == this.props.store.metadata.page) {
            style += ' text-malibu-600'
        }

        return style
    }    
}