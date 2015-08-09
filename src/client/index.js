import React from 'react';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './containers/App.jsx';
import FlowdockUtil from './FlowdockUtil';
// import FlowdockConnector from './FlowdockConnector';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('app'));

FlowdockUtil.sync(store.dispatch);
// FlowdockConnector.start();
