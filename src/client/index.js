import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App.jsx';
// import FlowdockConnector from './FlowdockConnector';
// import AppActions from './actions/AppActions';
import * as reducers from './reducers';

let app = combineReducers(reducers);
let store = createStore(app);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('app'));

// AppActions.init();

// FlowdockConnector.start();
