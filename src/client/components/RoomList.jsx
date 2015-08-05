import React, { Component, PropTypes } from 'react';
import PureRender from 'react-purerender';

import RoomActions from '../actions/RoomActions';

const styles = {
  container: {}
};

export default class RoomList extends Component {
  static propTypes = {
    rooms: PropTypes.array.isRequired,
    currentRoom: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  render() : Component {
    const { rooms, currentRoom, dispatch } = this.props;

    return (
      <ul className="c-Sidebar__RoomList">
        {rooms.map((room) => {
          return <Room
            key={room.id}
            room={room}
            isActive={currentRoom && room.id === currentRoom.id}
            showFn={() => dispatch(RoomActions.showRoom(room))}
            closeFn={() => dispatch(RoomActions.closeRoom(room))} />;
        })}
      </ul>
    )
  }
}
