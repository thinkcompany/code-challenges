// src/main.js
import React from 'react';
import ReactDOM from 'react-dom';

let headerElement = (
  <h1>
    I am a React element! Hear me roar!
  </h1>
);

ReactDOM.render(
  headerElement,
  document.getElementById('app')
);
