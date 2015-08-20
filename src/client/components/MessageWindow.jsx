import React, { Component, PropTypes } from 'react';

import Message from './Message.jsx';

export default class MessageWindow extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired
  }

  render() {
    const { users, messages } = this.props;

    return (
      <div className="c-MessageWindow">
        <ul className="c-MessageWindow__Messages o-scroller">
          {messages.map((message, i) => {
            return <Message
              key={message.id}
              users={users}
              message={message}
              previousMessage={messages[i-1]} />;
          })}
        </ul>
      </div>
    );
  }
}
