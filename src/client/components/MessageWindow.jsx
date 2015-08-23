import React, { Component, PropTypes } from 'react';

import Message from './Message.jsx';

export default class MessageWindow extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired
  }

  showThread(message) {
    console.log('open thread', message);
  }

  render() {
    const { users, messages } = this.props;

    return (
      <div>
        <ul className="c-MessageWindow__Messages o-scroller">
          {messages.map((message, i) => {
            return <Message
              key={message.id}
              users={users}
              message={message}
              previousMessage={messages[i-1]}
              onShowThread={() => this.showThread(message)} />;
          })}
        </ul>
      </div>
    );
  }
}
