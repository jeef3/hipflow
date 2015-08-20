import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import Room from './Room.jsx';
import { showRoom, closeRoom } from '../actions/RoomActions';

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
    dispatch: PropTypes.func.isRequired,

    rooms: PropTypes.array.isRequired,
    currentRoomId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }

  render() : Component {
    const { rooms, currentRoomId, dispatch } = this.props;

    return (
      <ul style={styles.container}>
        {rooms.map((room) => {
          return <Room
            key={room.id}
            room={room}
            isActive={room.id === currentRoomId}
            onShowRoom={() => dispatch(showRoom(room.id))}
            onCloseRoom={() => dispatch(closeRoom(room.id))} />;
        })}
      </ul>
    );
  }
}
