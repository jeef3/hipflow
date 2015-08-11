import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import cx from 'classnames';

function select(state) {
  return {
    currentRoom: state.currentRoom,

    threads: state.threads,
    sources: state.sources
  };
}

class ChatContext extends React.Component {
  constructor() {
    this._onChange = this._onChange.bind(this);
  }

  render() {
    const { currentRoom } = this.props;
    var context;

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
