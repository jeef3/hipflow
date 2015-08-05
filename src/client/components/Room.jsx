import React, {Component} from 'react';
import PureRender from 'react-purerender';

import Icon from './Icon.react';

const styles = {
  container: {}
};

@PureRender
export default class Room extends Component {
  static propTypes = {
    room: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    showFn: PropTypes.func.isRequired,
    closeFn: PropTypes.func.isRequired
  }

  render() : Component {
    const {room, isActive, showFn, closeFn} = this.props;

    return (
      <li className={cx('c-Sidebar__Room u-truncate', {
            'is-active': isActive,
            'has-unread': room.hasUnread() })}>

        <Button
            noFocus="true"
            className="c-Sidebar__ShowRoomButton"
            onClick={showFn}>
          <Icon kind="comments-o" className="room__icon" /> {room.name}
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
