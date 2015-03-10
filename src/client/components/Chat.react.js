'use strict';

import React from 'react';

import TopicBar from './TopicBar.react';
import MessageWindow from './MessageWindow.react';
import ChatBar from './ChatBar.react';
import MessageWindowStore from '../stores/MessageWindowStore';

function getState() {
  return {
  };
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = getState();

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    var room = this.props.room;

    return (
      <section className="c-Chat">
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

export default Chat;
