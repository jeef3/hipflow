'use strict';

import React from 'react';
import cx from 'classnames';

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
    var room = this.props.room;

    if (room.access_mode) {
      let users = room.getJoinedUsers()
        .sort((a, b) => {
          return b.last_activity - a.last_activity;
        });

      context = (
        <aside className="c-ChatContext">
          <ChatContext.Users users={users} />
        </aside>
      );
    } else {
      let user = room.users[1];
      let avatarUrl = user.avatar + '/316';

      context = (
        <aside className="c-ChatContext">
          <div className="c-ChatContext__User o-avatar o-avatar--large"
              title={user.name}
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
      var users = this.props.users;

      return (
        <ul className="c-ChatContext__Users">
          {users.map((user) => {
            return <ChatContext.User key={user.id} user={user} />;
          })}
        </ul>
      );
    }
  }

ChatContext.User =
  class User extends React.Component {
    render() {
      var user = this.props.user;

      return (
        <li title={user.name}
            style={{backgroundImage: 'url(' + user.avatar + '/60)'}}
            className={cx('c-ChatContext__User o-avatar', {
              'is-online': user.isOnline(),
              'is-offline': !user.isOnline() })}></li>
      );
    }
  }

export default ChatContext;
