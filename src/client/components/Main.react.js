'use strict';

import React from 'react';

import SideBar from './SideBar.react';
import Chat from './Chat.react';
import ChatContext from './ChatContext.react';
import MessageWindowStore from '../stores/MessageWindowStore';

function getState() {
  return {
    currentRoom: MessageWindowStore.getCurrentRoom()
  };
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = getState();

    this._onCurrentRoomChange = this._onCurrentRoomChange.bind(this);
  }

  componentDidMount() {
    MessageWindowStore.on('change', this._onCurrentRoomChange);
  }

  componentWillUnmount() {
    MessageWindowStore.off('change', this._onCurrentRoomChange);
  }

  render() {
    return (
      <main className="container">
        <SideBar room={this.state.currentRoom} />
        <Chat room={this.state.currentRoom} />
        <ChatContext room={this.state.currentRoom} />
      </main>
    );
  }

  _onCurrentRoomChange() {
    this.setState(getState());
  }
}

export default Main;
