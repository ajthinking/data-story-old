import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'


@inject('store') @observer
export default class InspectorsControl extends BaseControl {
    constructor(props) {
        super(props);
        this.title = 'Inspectors'
        this.icon = 'fas fa-table'
        this.page = 'Inspectors'
    }



    onClick()
    {
        this.props.store.setPage('Inspectors')
    }

    style() {
        let style = super.style()
        if(this.page == this.props.store.metadata.page) {
            style += ' text-malibu-600'
        }

        return style
    }      
}