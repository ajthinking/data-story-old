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
        this.props.store.setRunning()

        axios.post('/datastory/api/run', {
                model: nonCircularJsonStringify(
                    this.props.store.diagram.engine.model.serialize()
                )
          })
          .then((response) => {
                let processedDiagram = response.data.diagram;

                let inspectables = processedDiagram.nodes.filter(node => {
                    return node.features
                })

                this.props.store.setInspectables(
                    inspectables
                )

                this.props.store.setNotRunning()
          })
          .catch(function (error) {

            this.props.store.setNotRunning()
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