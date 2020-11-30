import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import Modal from 'react-modal';

const customStyles = {
    content : {
      'maxWidth': '450px',
      'top': '110px',
      'left': '120px',
      'padding': '0px',
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

export default class ManipulatorNodeWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

	render() {
		return (
            <div className="font-mono text-xxs text-gray-200">
                <div className="flex-grow-0 w-32">
                    {this.renderHeading()}
                    {this.renderInPorts()}                  
                    {this.renderOutPorts()}
                </div>
            </div>
		);
    }

    renderHeading() {
        return (
            <div
                className="flex justify-between items-center pl-4 pr-2 py-1 border border-gray-900 font-bold rounded-lg bg-gray-700"
                onDoubleClick={this.open.bind(this)}
            >
                <span>{this.props.node.getDisplayName()}</span>
                <i className="fas fa-cog"></i>
                {this.renderModal()}
            </div>            
        )
    }
    
    renderInPorts() {
        return Object.values(this.props.node.getInPorts()).map((port) => {
            return (
                <PortWidget key={port.options.name} engine={this.props.engine} port={port}>
                    <div className="flex items-center text-gray-200 mx-2 py-1 px-4 border border-gray-900 rounded-lg bg-gray-500">
                        <div className="w-full">
                            <span>{port.options.label}</span>
                        </div>
                    </div>
                </PortWidget>
            )
        })
    }

    renderOutPorts() {
        return Object.values(this.props.node.getOutPorts()).map((port) => {
            return (
                <PortWidget key={port.options.name} engine={this.props.engine} port={port}>
                    <div className="flex items-center text-gray-200 mx-2 py-1 px-4 border border-gray-900 rounded-lg bg-gray-500">
                        <div className="w-full">
                            <span>{port.options.label}</span>
                        </div>
                    </div>
                </PortWidget> 
            )
        })
    }

    renderModal() {
        return (<Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.closeModal.bind(this)}
            style={customStyles}
            contentLabel="HEY EDIT MANIPULATOR"
            >

                <div className="bg-gray-200 h-full p-4">
                    <p className="text-sm mb-2 font-medium text-gray-900 text-bold">
                        <span className="text-indigo-500">Elouquent</span>
                        <span className="">::Users</span>
                        
                    </p>
                    <p className="text-xs text-gray-500">
                        <span className="ml-2">#aobnabfnadfbaofnbaodfbnaofbnanoafb</span>
                    </p>

                    <input className="text-xs px-4 py-2" placeholder="Users"></input>
                    <input className="text-xs px-4 py-2" placeholder="Users"></input>
                </div>

        </Modal>);
    }    

    open() {
        this.setState({
            isOpen: true
        });
    }

    closeModal() {
        this.setState({
            isOpen: false
        });
    }    
}

