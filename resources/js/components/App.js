import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Diagram from './Diagram';
import store from "../store/main"
import { observer } from "mobx-react"

@observer
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateStory = this.updateStory.bind(this);
      }

    updateStory() {
        this.props.store.story.set('new-project');
    }

    render() {
        return (
            <div >
                <Header />
                <div className="pl-4 bg-gray-300">{ this.props.store.story.get() }</div>
                <Diagram />
                <button onClick={this.updateStory}>New story!</button>
            </div>
        );
    }
}


if (document.getElementById('app')) {
    ReactDOM.render(<App store={store} />, document.getElementById('app'));
}
