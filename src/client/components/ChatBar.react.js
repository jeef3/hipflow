'use strict';

import React from 'react';

class ChatBar extends React.Component {
  render() {
    return (
      <div className="chat-bar">
        <div className="current-discussion" ng-show="currentDiscussion.id">
          <i className="fa fa-fw fa-angle-double-right"></i>
          <span ng-bind-html="currentDiscussion.title | emoji"></span>
          <button className="btn close" ng-click="setCurrentDiscussion()">
            <i className="fa fa-fw fa-times"></i>
          </button>
        </div>
        <form name="sendMessageForm" ng-submit="send(message)">
          <div className="chat-input-container">
            <textarea
                chat-input-submit="send(message)"
                focus-on="CURRENT_DISCUSSION_SET"
                placeholder="Chat..."
                className="chat-input"
                ng-model="message"></textarea>
          </div>
        </form>

        <p className="user-typing emphasis small quiet" ng-show="usersTyping().length">
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
    )
  }
}

export  default ChatBar;
