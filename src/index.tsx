import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import App from './App';
import firebaseConfig from './firebase/firebase-config';

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
