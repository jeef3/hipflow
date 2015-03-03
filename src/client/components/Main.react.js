'use strict';

import React from 'react';

import SideBar from './SideBar.react';
import ChatContext from './ChatContext.react';

class Main extends React.Component {
  render() {
    return (
      <main className="container">
        <SideBar />
        Messages
        <ChatContext />
      </main>
    );
  }
}

export default Main;
