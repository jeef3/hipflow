import React from 'react-dom';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './containers/App.jsx';
import FlowdockUtil from './FlowdockUtil';
// import FlowdockConnector from './FlowdockConnector';
import * as reducers from './reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools()
)(createStore);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

ReactDOM.render(
  <div style={{height: '100%'}}>
    <Provider store={store}>
      {() => <App />}
    </Provider>

    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  document.getElementById('app'));

FlowdockUtil.load(store.dispatch, store.getState);
// FlowdockConnector.start();
