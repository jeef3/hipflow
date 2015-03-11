'use strict';

import React from 'react';
import cx from 'classnames';

class Message extends React.Component {
  render() {
    var message = this.props.message;
    var previous = this.props.previousMessage;
    var meta = message.getMetadata();

    return (
      <li data-timestamp={message.sent}
          className={cx('c-Message', `c-Message--${message.app}`, {
            'c-Message--me': message.user.isMe(),
            'c-Message--highlight': message.highlight,
            'c-Message--mentions-me': message.mentionsMe,
            'c-Message--thread': message.thread,
            'c-Message--comment': message.parent,
            'c-Message--monologue': message.isMonologue(previousMessage),
            'c-Message--date-separator': !message.isSameDay(previousMessage),
            'c-Message--first-unseen': message.isFirstUnseen(room, message, $index),
            'c-Message--success': message.hasTags('success'),
            'c-Message--notify': message.hasTags('notify'),
            'c-Message--fail': message.hasTags('fail')})}>

        <Button className="message__discussion-marker"
            onClick="setCurrentDiscussion(message)">
          <Icon kind={message.parent ? 'comments' : 'comment'} />
        </Button>

        <div className="o-avatar message__author-avatar"
            style={{backgroundImage: `url(${meta.avatar})`}}></div>
        <div className="message__author">{meta.author}</div>

        <a href="{{meta.permalink}}" title="Permalink">
          <time datetime="{{message.sent | date:'yyyy-mm-ddThh:mm:ssZ'}}"
              title="{{message.sent | date:'fullDate'}}"
              className="message__timestamp"
              am-time-ago="message.sent"></time>
        </a>

        <div className="message__content">
          <div className="emphasis quiet"
              ng-if="!message.content">Redacted</div>
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
}

export default Message;
