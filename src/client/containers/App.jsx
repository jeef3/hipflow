import React from 'react';
import { connect } from 'react-redux';

import SideBar from '../components/SideBar.jsx';
// import Chat from '../Chat.react';
// import ChatContext from '../ChatContext.react';

function currentRoomSelect(state) {
  return state.currentRoom || {};
}

@connect(currentRoomSelect)
export default class Main extends React.Component {
  render() : Component {
    const currentRoom = this.props;

    return (
      <main className="container">
        <SideBar room={currentRoom} />
      </main>
    );
  }
}
// <Chat room={currentRoom} />
// <ChatContext room={currentRoom} />
