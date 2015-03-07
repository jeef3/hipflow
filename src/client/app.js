'use strict';

import React from 'react';

import FlowdockConnector from './FlowdockConnector';
import AppActions from './actions/AppActions';
import Main from './components/Main.react';

// Application root element
React.render(
  <Main />,
  document.getElementById('app'));

AppActions.init();

FlowdockConnector.start();
