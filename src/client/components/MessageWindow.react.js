'use strict';

import React from 'react';

import Message from './Message.react';
import MessageStore from '../stores/MessageStore';

class MessageWindow extends React.Component {
  constructor() {
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    MessageStore.on('messages_updated', this._onChange);
  }

  componentWillUnmount() {
    MessageStore.off('messages_updated', this._onChange);
  }

  render() {
    var room = this.props.room;
    var messages = MessageStore.getMessagesForRoom(room.id);

    return (
      <div className="c-MessageWindow">
        <ul className="c-MessageWindow__Messages o-scroller">
          {messages.map((message, i) => {
            return <Message
                key={message.id}
                message={message}
                previousMessage={messages[i-1]} />;
          })}
        </ul>
      </div>
    )
  }

  _onChange() {
    this.forceUpdate();
  }
}

export default MessageWindow;
