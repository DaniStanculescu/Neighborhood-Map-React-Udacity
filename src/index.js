import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
window.gm_authFailure = function() {
    // remove the map div or maybe call another API to load map
   // maybe display a useful message to the user
   alert('Google maps failed to load!');
   console.log('Wrong key was submitted,please try again later!!!')
}
