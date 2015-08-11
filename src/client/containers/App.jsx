import React from 'react';
import { connect } from 'react-redux';

import SideBar from './SideBar.jsx';
// import Chat from '../Chat.react';
// import ChatContext from '../ChatContext.react';

export default class Main extends React.Component {
  render() : Component {
    return (
      <main className="container">
        <SideBar />
      </main>
    );
  }
}
// <Chat room={currentRoom} />
// <ChatContext room={currentRoom} />
