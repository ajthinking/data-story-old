import React from 'react';
import Header from './Header';
import Toolbar from './Toolbar';
import Workbench from './pages/Workbench'
import Inspectors from './pages/Inspectors'
import Diagram from './Diagram';
import { inject, observer } from "mobx-react"
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


@inject('store') @observer
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.store = {
            booted: false
        }
    }

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
        // Since dynamic <ActivePage /> does not work :| ???
        let page = this.props.store.metadata.page

        if(page === 'Workbench') return (<Workbench />);
        if(page === 'Inspectors') return (<Inspectors />);
    }
    
    componentDidMount() {
        this.boot()
        this.registerKeybindings()
    }

    boot() {
        axios.post('/datastory/api/boot', {
            context: window.location.href
        })
        .then((response) => {
            this.props.store.setAvailableNodes(
                response.data.dataStoryCapabilities.availableNodes
            );

            this.setState({
                booted: true
            })  
            
            console.log('asaf');
        })
        .catch(error => {
            console.log('Boot error', error)
            this.showBootFailureToast()
        });
    }

    registerKeybindings() {
        Mousetrap.bind(
            'shift+d',
            (e) => {
                this.props.store.setPage('Workbench')
            }
        );

        Mousetrap.bind(
            'shift+t',
            (e) => {
                this.props.store.setPage('Inspectors')
            }
        ); 
    }    

    showBootFailureToast()
    {
        toast.info(' Could not Boot! Check console.', {
            position: "bottom-right",
            transition: Slide,
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }    
}