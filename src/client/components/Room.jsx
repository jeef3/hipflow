import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import cx from 'classnames';
import Radium from 'radium';

import Icon from './Icon.react';
import Button from './Button.jsx';
import theme from '../theme';

const styles = {
  container: {
    position: 'relative',
    paddingRight: '1.875em',

    borderTopRightRadius: '0.313em',
    borderBottomRightRadius: '0.313em',

    ':hover': {
      background: theme.sidebar.backgroundDark
    }
  },

  isActive: {
    color: theme.sidebar.textLight,
    background: theme.sidebar.backgroundAngle
  },

  hasUnread: {
    fontWeight: 900,
    color: theme.sidebar.textLight
  },

  showRoomButton: {
    ...theme.buttonNoFocus,
    display: 'block',
    width: '100%',
    padding: '0 0.625em',
    margin: 0,

    lineHeight: '2em'
  },

  closeRoomButton: {
    ...theme.buttonNoFocus,
    display: 'none',
    position: 'absolute',
    width: '2em',
    height: '2em',

    top: 0,
    right: 0
  }
};

@Radium
export default class Room extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  static propTypes = {
    room: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,

    onShowRoom: PropTypes.func.isRequired,
    onCloseRoom: PropTypes.func.isRequired
  }

  render() : Component {
    const {room, isActive, onShowRoom, onCloseRoom} = this.props;

    return (
      <li style={[
        styles.container,
        isActive && styles.isActive,
        room.hasUnread && styles.hasUnread
      ]} className='u-truncate'>

        <Button
            noFocus="true"
            style={styles.showRoomButton}
            onClick={onShowRoom}>
          <Icon kind="comments-o" className="room__icon" />
          {room.name}
          <Icon kind="circle" className="unread-marker" />
        </Button>

        <Button
            noFocus="true"
            style={styles.closeRoomButton}
            onClick={onCloseRoom}>
          <Icon kind="times" />
        </Button>
      </li>
    );
  }
}
