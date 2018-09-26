import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './Components/App/App.js';
// import './Components/App/App.css';
import App from './Components/App/App.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
