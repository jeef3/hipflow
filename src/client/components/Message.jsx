import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as messageRenderers from './messages';
import { getMetadata, isMonologue, isSameDay } from '../message-util';
import Button from './Button.jsx';
import Icon from './Icon.react.js';

function isMe(user) {
  return false;
}

export default class Message extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    previous: PropTypes.object,

    onShowThread: PropTypes.func.isRequired
  }

  render() : Component {
    const { users, message, previous, onShowThread } = this.props;
    var meta = getMetadata(message, users);

    return (
      <li data-timestamp={message.sent}
          className={cx('c-Message', `c-Message--${message.app}`, {
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
            onClick={onShowThread}>
          <Icon kind={message.parent ? 'comments' : 'comment'} />
        </Button>

        <div className="o-avatar c-Message__AuthorAvatar"
            style={{backgroundImage: `url(${meta.avatar})`}}></div>
        <div className="c-Message__Author">{meta.author}</div>

        <a href="{{meta.permalink}}" title="Permalink">
          <time dateTime="{{message.sent | date:'yyyy-mm-ddThh:mm:ssZ'}}"
              title="{{message.sent | date:'fullDate'}}"
              className="message__timestamp"
              am-time-ago="message.sent"></time>
        </a>

        <div className="c-Message__Content">
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
