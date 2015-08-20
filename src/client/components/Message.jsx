import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as messageRenderers from './messages';
import Button from './Button.react.js';
import Icon from './Icon.react.js';

function getMetadata(message) {
  if (message.event === 'message' ||
      message.event === 'comment' ||
      message.event === 'file') {
    return {
      author: message.user.name,
      avatar: message.user.avatar + '60'
    };
  }

  switch (message.event) {
    case 'jira':
      return {
        author: 'JIRA',
        avatar: '/images/jira/avatar.png'
      };
    case 'vcs':
      return {
        author: 'GitHub',
        avatar: '/images/github/avatar.png'
      };
    case 'trello':
      return {
        author: 'Trello',
        avatar: '/images/trello/avatar.png'
      };
  }
}

function isMe(user) {
  return false;
}

function isMonologue(current, previous) {
  if (current.user === '0') {
    return previous && current.event === previous.event;
  } else {
    return previous &&
      current.user === previous.user &&
      current.app === previous.app;
  }
}

function isSameDay(current, previous) {
  if (!previous) {
    return true;
  }

  return new Date(current.sent).getDate() === new Date(previous.sent).getDate();
}

export default class Message extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    previous: PropTypes.object
  }

  render() : Component {
    const { message, previous } = this.props;
    var meta = getMetadata(message);

    return (
      <li data-timestamp={message.sent}
          className={cx('c-Message', 'c-Message--${message.app}', {
            'c-Message--Me': isMe(message.user),
            'c-Message--Highlight': message.highlight,
            'c-Message--MentionsMe': message.mentionsMe,
            'c-Message--Thread': message.thread,
            'c-Message--Comment': message.parent,
            'c-Message--Monologue': isMonologue(message, previous),
            'c-Message--DateSeparator': !isSameDay(message, previous),
            'c-Message--Success': message.tags.indexOf('success') > -1,
            'c-Message--Notify': message.tags.indexOf('notify') > -1,
            'c-Message--Fail': message.tags.indexOf('fail') > -1})}>

        <Button className="c-Message__DiscussionMarker"
            onClick="setCurrentDiscussion(message)">
          <Icon kind={message.parent ? 'comments' : 'comment'} />
        </Button>

        <div className="o-avatar message__author-avatar"
            style={{backgroundImage: 'url(${meta.avatar})'}}></div>
        <div className="message__author">{meta.author}</div>

        <a href="{{meta.permalink}}" title="Permalink">
          <time dateTime="{{message.sent | date:'yyyy-mm-ddThh:mm:ssZ'}}"
              title="{{message.sent | date:'fullDate'}}"
              className="message__timestamp"
              am-time-ago="message.sent"></time>
        </a>

        <div className="message__content">
          {this.renderMessage()}
          <div ng-if="message.event === 'message'" ng-include="'views/messages/plain.html'"></div>
          <div ng-if="message.event === 'comment'" ng-include="'views/messages/comment.html'"></div>
          <div ng-if="message.event === 'file'" ng-include="'views/messages/file.html'"></div>

          <div ng-if="message.event === 'mail'" ng-include="'views/messages/mail.html'"></div>

          <div ng-if="message.event === 'jira'"
              ng-init="jira = message.content"
              ng-include="'views/messages/jira-' + message.content.event_type + '.html'"></div>

          <div ng-if="message.event === 'vcs'"
              ng-init="github = message.content"
              ng-include="'views/messages/github-' + message.content.event + '.html'"></div>

          <div ng-if="message.event === 'trello'"
              ng-init="trello = message.content"
              ng-include="'views/messages/trello-' + message.content.action.type + '.html'"></div>
        </div>
      </li>
    );
  }

  renderMessage() : Component {
    const { message } = this.props;

    if (!message.content) {
      return <div className="emphasis quiet">Redacted</div>;
    }

    const MessageRenderer = messageRenderers[message.event];

    if (MessageRenderer) {
      return <MessageRenderer message={message} />;
    } else {
      return <p>No renderer for {message.event}</p>;
    }
  }
}
