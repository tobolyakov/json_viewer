//Core
import React from 'react';
import ReactDOM from 'react-dom';

//Components
import  App from './components/App/';
import registerServiceWorker from './registerServiceWorker';

// Instruments
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
