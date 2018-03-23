import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/inline.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
