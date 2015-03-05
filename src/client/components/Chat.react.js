'use strict';

import React from 'react';

import TopicBar from './TopicBar.react';
import MessageWindow from './MessageWindow.react';
import ChatBar from './ChatBar.react';
import MessageWindowStore from '../stores/MessageWindowStore';

function getState() {
  return {
    currentRoom: MessageWindowStore.getCurrentRoom()
  };
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = getState();

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    MessageWindowStore.on('change', this._onChange);
  }

  componentWillUnmount() {
    MessageWindowStore.off('change', this._onChange);
  }

  render() {
    var room = this.state.currentRoom;

    return (
      <section className="chat">
        <TopicBar name={room.name} description={room.description} />
        <MessageWindow />
        <ChatBar />
      </section>
    )
  }

  _onChange() {
    this.setState(getState());
  }
}

export default TopicBar;
