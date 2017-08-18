import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root.jsx';
import configureStore from './store/store';
import { requestData } from './actions/actions';

document.addEventListener('DOMContentLoaded', function(){
  const store = configureStore();
  window.store = store;
  window.requestData = requestData;
  ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
});
