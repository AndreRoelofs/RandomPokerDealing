import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WebFont from 'webfontloader';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif'],
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
