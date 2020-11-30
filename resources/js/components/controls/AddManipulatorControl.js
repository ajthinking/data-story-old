import React from 'react';
import ReactDOM from 'react-dom'
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';
import Modal from 'react-modal';
import ManipulatorSearch from './ManipulatorSearch'
var Mousetrap = require('mousetrap');

const customStyles = {
  content : {
    'maxWidth': '450px',
    'top': '110px',
    'left': '120px',
    //top                   : '25%',
    //left                  : '25%',
    //right                 : 'auto',
    //bottom                : 'auto',
    //marginRight           : '-50%',
    //transform             : 'translate(-50%, -50%)'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
  },  
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#app')


@inject('store') @observer
export default class AddManipulatorControl extends BaseControl {
    constructor(props) {
        super(props);
        this.title = 'Add manipulator'
        this.icon = 'fas fa-plus'
        this.state = {
            isOpen: false
        }

        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.setState({
            isOpen: true
        });
    }
    
    closeModal() {
        this.setState({
            isOpen: false
        });
    }

    renderIcon() {
        return (
            <span
                title={this.title}
                className={this.style()}
                onClick={this.onClick.bind(this)}
            >
                <i className={this.icon}></i>
            </span>
        );
    }
    
    renderModal() {
        return (<Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.closeModal.bind(this)}
            style={customStyles}
            contentLabel="Example Modal"
            >            
                <ManipulatorSearch />
        </Modal>);
    }
    
    render() {
        return (<span>
            {super.render()}
            {this.renderModal()}
        </span>)
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
            'enter',
            (e) => {
                let prefix = 'data-node-model-'

                // Get relevant data properties as object { 0: data-key-x }
                let dataAttributes = _.pickBy(e.target.attributes, function(value, key) {
                    return (value.name ?? false) && value.name.startsWith(prefix)
                })

                let options = Object.values(dataAttributes).reduce(
                    (results, attribute) => {
                        let optionName = attribute.name.replace(prefix, '')
                        return {
                            ...results,
                            [optionName]: e.target.getAttribute(attribute.name)
                        }
                    }, {})

                this.props.store.addManipulator(
                    options['diagram-node-type']
                )

                e.preventDefault()   
                this.closeModal()                
            }
        );        
    }
}