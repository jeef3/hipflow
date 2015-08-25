import React, { Component, PropTypes } from 'react';

import Icon from './Icon.react';
import Button from './Button.jsx';

function usersTyping() {
  return [];
}

class ChatBar extends Component {
  static propTypes = {
    room: PropTypes.object.isRequired
  }

  render() {
    // const { room } = this.props;

    return (
      <div className='c-ChatBar'>
        <div className='c-ChatBar__CurrentDiscussion' ng-show='currentDiscussion.id'>
          <Icon kind='angle-double-right' />
          <span ng-bind-html='currentDiscussion.title | emoji'></span>
          <Button className='close' ng-click='setCurrentDiscussion()'>
            <Icon kind='times' />
          </Button>
        </div>
        <form name='sendMessageForm' ng-submit='send(message)'>
          <div className='c-ChatBar__InputContainer'>
            <textarea
                chat-input-submit='send(message)'
                focus-on='CURRENT_DISCUSSION_SET'
                placeholder='Type to chat...'
                className='c-ChatBar__Input'
                ng-model='message'></textarea>
          </div>
        </form>

        <p className='c-ChatBar__UserTyping emphasis small quiet' ng-show='usersTyping().length'>
          {this.renderTypingText()}
        </p>
      </div>
    );
  }

  renderTypingText() {
    var len = usersTyping().length;
    var msg;

    if (!len) {
      msg = `No one is typing`;
    } else if (len === 1) {
      msg = `${usersTyping()[0].name} is typing`;
    } else if (len === 2) {
      msg = `${usersTyping()[0].name} and ${usersTyping()[1].name} are typing`;
    } else if (len === 3) {
      msg = `${usersTyping()[0].name}, ${usersTyping()[1].name} and one other person is typing`;
    } else if (len > 3) {
      msg = `${usersTyping()[0].name}, ${usersTyping()[1].name} and ${len} other people are typing`;
    }

    return <span>{msg}</span>;
  }
}

export  default ChatBar;
