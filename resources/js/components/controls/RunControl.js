import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';

@inject('store') @observer
export default class RunControl extends BaseControl {
    constructor(props) {
        super(props);
        this.title = 'Run story'
        this.icon = 'fas fa-play'
    }

    onClick()
    {
        let model = this.props.store.diagram.engine.model.serialize()

        axios.post('/datastory/api/run', {
            diagram: {
                nodeType: 'EloquentReader',
                class: 'App\\Models\\User',
                model: this.props.store.diagram.engine.model.serialize()
            }

          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    componentDidMount() {
        
        Mousetrap.bind(
            '?', // shift+plus 
            (e) => {
                e.preventDefault()   
                this.onClick()
            }
        );

        Mousetrap.bind(
            'shift+r',
            (e) => {
                this.onClick()
            }
        );        
    }    
}