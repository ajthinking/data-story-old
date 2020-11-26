import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';

@inject('store') @observer
export default class AddManipulatorControl extends BaseControl {
    constructor(props) {
        super(props);
        this.title = 'Add manipulator'
        this.icon = 'fas fa-plus'
    }

    onClick() {
        this.props.store.addManipulator()
    }
}