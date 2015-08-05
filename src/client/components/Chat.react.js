import React from 'react';

import TopicBar from './TopicBar.react';
import MessageWindow from './MessageWindow.react';
import ChatBar from './ChatBar.react';

class Chat extends React.Component {
  render() {
    const {room} = this.props;

    return (
      <section className="c-Chat">
        <TopicBar name={room.name} description={room.description} />
        <MessageWindow room={room} />
        <ChatBar room={room} />
      </section>
    )
  }
}

export default Chat;
