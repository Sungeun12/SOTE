import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './util/store';
import App from './App';
import { setUserTemp } from './actions/auth_actions';
import storage from './util/storage';

function loadLocalUser() {
  try {
    const user = storage.get('user');
    if (!user) return;
    store.dispatch(setUserTemp());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

loadLocalUser();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
