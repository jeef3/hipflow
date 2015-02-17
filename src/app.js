'use strict';

import './components';
import Flowdock from './flowdock';
import Users from './users';
import Rooms from './rooms';
import main from './main';

// Application root element
var el = document.getElementById('app');
main(el);

Flowdock.connect();
Users.update();
Rooms.update();
