import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import Room from './Room.jsx';

const styles = {
  container: {
    padding: '0 1em 0 0',
    margin: 0,

    listStyle: 'none',
    fontSize: '0.875em'
  }
};

export default class RoomList extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  static propTypes = {
    rooms: PropTypes.array.isRequired,
    currentRoomId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),

    onShowRoom: PropTypes.func.isRequired,
    onCloseRoom: PropTypes.func.isRequired
  }

  render() : Component {
    const {
      rooms,
      currentRoomId,
      onShowRoom,
      onCloseRoom
    } = this.props;

    return (
      <ul style={styles.container}>
        {rooms.map((room) => {
          return <Room
            key={room.id}
            room={room}
            isActive={room.id === currentRoomId}
            onShowRoom={() => (onShowRoom(room.id))}
            onCloseRoom={() => (onCloseRoom(room.id))} />;
        })}
      </ul>
    );
  }
}
