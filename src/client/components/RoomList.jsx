import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import Room from './Room.jsx';
import { showRoom, closeRoom } from '../actions/RoomActions';

export default class RoomList extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    rooms: PropTypes.array.isRequired,
    currentRoom: PropTypes.string
  }

  render() : Component {
    const { rooms, currentRoom, dispatch } = this.props;

    return (
      <ul className="c-Sidebar__RoomList">
        {rooms.map((room) => {
          return <Room
            key={room.id}
            room={room}
            isActive={room.id === currentRoom}
            onShowRoom={() => dispatch(showRoom(room.id))}
            onCloseRoom={() => dispatch(closeRoom(room.id))} />;
        })}
      </ul>
    )
  }
}
