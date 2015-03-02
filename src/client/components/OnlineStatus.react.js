'use strict';

import React from 'react';
import cx from 'react/lib/cx';

import UserStore from '../stores/UserStore';

function getState() {
  return {
    online: navigator.onLine,
    me: UserStore.getMe()
  };
}

class OnlineStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = getState();

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('online', this._onChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this._onChange);
  }

  render() {
    // style={{backgroundImage: 'url(' + this.state.me.avatar + '80)'}></div>
    return (
      <div className="online-status">
        <div className="avatar avatar--medium"></div>
        <span className="online-status__name">{this.state.me.name}</span>
        <i className={cx({
            'fa fa-fw': true,
            'fa-circle': true,
            'online-status-icon--online': this.state.online,
            'online-status-icon--offline': !this.state.online
          })}></i>
      </div>
    )
  }

  _onChange() {
    this.setState(getState());
  }
}

export default OnlineStatus;
