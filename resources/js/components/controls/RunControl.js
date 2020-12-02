import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';
import {nonCircularJsonStringify} from '../../utils/nonCircularJsonStringify'

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
            model: nonCircularJsonStringify(
                this.props.store.diagram.engine.model.serialize()
            ),
            executionOrder: this.props.store.diagram.engine.model.executionOrder()
                .map(node => node.options.id)
          })
          .then(function (response) {
            console.log("WOW", response.data);
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