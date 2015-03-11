'use strict';

import React from 'react';
import cx from 'classnames';

import RoomStore from '../stores/RoomStore';

function getState() {
  return {
    threads: [],
    sources: []
  };
}

class ChatContext extends React.Component {
  constructor() {
    this.state = getState();

    this._onChange = this._onChange.bind(this);
  }

  render() {
    var context;
    if (this.props.room.access_mode) {
      var users = this.props.room.getJoinedUsers().sort((a, b) => {
        return b.last_activity - a.last_activity;
      });

      context = (
        <aside className="c-ChatContext">
          <ChatContext.Users users={users} />
        </aside>
      );
    } else {
      var userName = this.props.room.users[1].name;
      var avatarUrl = this.props.room.users[1].avatar + '/316';

      context = (
        <aside className="c-ChatContext">
          <div className="c-ChatContext__User o-avatar o-avatar--large"
              title={userName}
              style={{backgroundImage: `url(${avatarUrl})`}}>
          </div>
        </aside>
      );
    }

    return context;
  }

  _onChange() {
    this.setState(getState());
  }
}

ChatContext.Users =
  class Users extends React.Component {
    render() {
      return (
        <ul className="c-ChatContext__Users">
          {this.props.users.map(function (user) {
            return (
              <li key={user.id}
                  title={user.name}
                  style={{backgroundImage: 'url(' + user.avatar + '/60)'}}
                  className={cx('c-ChatContext__User o-avatar', {
                    'is-online': user.isOnline(),
                    'is-offline': !user.isOnline() })}></li>
            );
          })}
        </ul>
      );
    }
  }

export default ChatContext;
