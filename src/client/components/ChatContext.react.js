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
  constructor(props) {
    super(props);
    this.state = getState();

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    var context;
    if (this.props.room.access_mode) {
      var users = this.props.room.getJoinedUsers().sort((a, b) => {
        return b.last_activity - a.last_activity;
      });

      context = (
        <aside className="chat-context">
          <ChatContext.Users users={users} />
        </aside>
      );
    } else {
      context = (
        <aside className="chat-context">
          <div className="user avatar avatar--large"
              title={this.props.room.users[1].name}
              style={{backgroundImage: 'url(' + this.props.room.users[1].avatar + '/316)'}}>
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
        <ul className="users">
          {this.props.users.map(function (user) {
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
            className={cx('user avatar', {
              'user--online': user.isOnline(),
              'user--offline': !user.isOnline()
            })}>
        </li>
      );
    }
  }

export default ChatContext;
