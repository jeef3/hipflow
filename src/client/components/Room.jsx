import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import cx from 'classnames';

import Icon from './Icon.react';
import Button from './Button.react.js';

export default class Room extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  static propTypes = {
    room: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,

    onShowRoom: PropTypes.func.isRequired,
    onCloseRoom: PropTypes.func.isRequired
  }

  render() : Component {
    const {room, isActive, showFn, closeFn} = this.props;

    return (
      <li className={cx('c-Sidebar__Room u-truncate', {
        'is-active': isActive,
        'has-unread': room.hasUnread })}>

        <Button
            noFocus="true"
            className="c-Sidebar__ShowRoomButton"
            onClick={showFn}>
          <Icon kind="comments-o" className="room__icon" />
          {room.name}
          <Icon kind="circle" className="unread-marker" />
        </Button>

        <Button
            noFocus="true"
            className="c-Sidebar__CloseRoomButton"
            onClick={closeFn}>
          <Icon kind="times" />
        </Button>
      </li>
    );
  }
}
