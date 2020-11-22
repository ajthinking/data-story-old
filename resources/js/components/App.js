import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Diagram from './Diagram';

function App() {
    return (
        <div>
            <Header />
            <Diagram />
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
