import React, { Component, PropTypes } from 'react';

import TopicBar from './TopicBar.jsx';
// import MessageWindow from './MessageWindow.react';
import ChatBar from './ChatBar.jsx';

export default class Chat extends Component {
  static propTypes = {
    room: PropTypes.object
  }

  render() {
    const { room } = this.props;

    if (!room) {
      return <p>No room selected</p>;
    }

    return (
      <section className="c-Chat">
        <TopicBar name={room.name} description={room.description} />
        <ChatBar room={room} />
      </section>
    );
  }
}

// <MessageWindow room={room} />
