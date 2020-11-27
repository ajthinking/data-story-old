import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';
import Modal from 'react-modal';
import ManipulatorSearch from './ManipulatorSearch'
var Mousetrap = require('mousetrap');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
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
            this.onClick
        );
    }
}