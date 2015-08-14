import React from 'react';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './containers/App.jsx';
import FlowdockUtil from './FlowdockUtil';
// import FlowdockConnector from './FlowdockConnector';
import * as reducers from './reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

React.render(
  <div>
    <Provider store={store}>
      {() => <App />}
    </Provider>

    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  document.getElementById('app'));

FlowdockUtil.sync(store.dispatch);
// FlowdockConnector.start();
