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
}