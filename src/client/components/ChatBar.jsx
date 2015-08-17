import React, { Component, PropTypes } from 'react';

import Icon from './Icon.react';
import Button from './Button.react';

class ChatBar extends React.Component {
  static propTypes = {
    room: PropTypes.object.isRequired
  }

  render() {
    const { room } = this.props;

    return (
      <div className="c-ChatBar">
        <div className="c-ChatBar__CurrentDiscussion" ng-show="currentDiscussion.id">
          <Icon kind="angle-double-right" />
          <span ng-bind-html="currentDiscussion.title | emoji"></span>
          <Button className="close" ng-click="setCurrentDiscussion()">
            <Icon kind="times" />
          </Button>
        </div>
        <form name="sendMessageForm" ng-submit="send(message)">
          <div className="c-ChatBar__InputContainer">
            <textarea
                chat-input-submit="send(message)"
                focus-on="CURRENT_DISCUSSION_SET"
                placeholder="Type to chat..."
                className="c-ChatBar__Input"
                ng-model="message"></textarea>
          </div>
        </form>

        <p className="c-ChatBar__UserTyping emphasis small quiet" ng-show="usersTyping().length">
          <div
            count="usersTyping().length"
            offset="2"
            when="{'0': 'No one is typing',
                   '1': '{{usersTyping()[0].name}} is typing',
                   '2': '{{usersTyping()[0].name}} and {{usersTyping()[1].name}} are typing',
                   'one': '{{usersTyping()[0].name}}, {{usersTyping()[1].name}} and one other person are typing',
                   'other': '{{usersTyping()[0].name}}, {{usersTyping()[1].name}}, and {} other people are typing'}">
          </div>
        </p>
      </div>
    );
  }
}

export  default ChatBar;
