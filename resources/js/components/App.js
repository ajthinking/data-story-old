import React from 'react';
import Header from './Header';
import Toolbar from './Toolbar';
import StoryWorkbench from './pages/StoryWorkbench'
import Inspectors from './pages/Inspectors'
import Diagram from './Diagram';
import { inject, observer } from "mobx-react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


@inject('store') @observer
export default class App extends React.Component {
    render() {
        return (
            <div >
                <Header />
                <Toolbar />
                {this.renderActivePage()}
                <ToastContainer
                    style={{paddingTop: '0px'}}
                ></ToastContainer>
            </div>
        );
    }

    renderActivePage()
    {
        // Since dynamic <ActivePage /> does not work :|
        let page = this.props.store.metadata.page

        if(page === 'StoryWorkbench') return (<StoryWorkbench />);
        if(page === 'Inspectors') return (<Inspectors />);
    }
    
    componentDidMount() {
        Mousetrap.bind(
            'shift+d',
            (e) => {
                this.props.store.setPage('StoryWorkbench')
            }
        );

        Mousetrap.bind(
            'shift+t',
            (e) => {
                this.props.store.setPage('Inspectors')
            }
        );        
    }     
}