'use strict';

import React from 'react';

import Flowdock from './flowdock';
import Users from './users';
import Rooms from './rooms';
import Main from './components/main.react';

// Application root element
React.render(
  React.createElement(Main, null),
  document.getElementById('app'));

Flowdock.connect();
Users.update();
Rooms.update();
