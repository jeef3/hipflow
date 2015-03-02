'use strict';

import React from 'react';

import Dispatcher from './dispatcher';
import Flowdock from './flowdock';
import Main from './components/Main.react';

// Application root element
React.render(
  <Main />,
  document.getElementById('app'));

Dispatcher.dispatch({ action: { type: 'app_init' } });

Flowdock.connect();
