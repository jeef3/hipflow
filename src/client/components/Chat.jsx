import React, { Component, PropTypes } from 'react';

import TopicBar from './TopicBar.jsx';
import MessageWindow from './MessageWindow.jsx';
import ChatBar from './ChatBar.jsx';

export default class Chat extends Component {
  static propTypes = {
    room: PropTypes.object,
    messages: PropTypes.array.isRequired
  }

  render() {
    const { room, messages } = this.props;

    if (!room) {
      return <p>No room selected</p>;
    }

    return (
      <section className="c-Chat">
        <TopicBar name={room.name} description={room.description} />
        <MessageWindow messages={messages} />
        <ChatBar room={room} />
      </section>
    );
  }
}
