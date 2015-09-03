import {
  RECEIVE_MESSAGES,
  LOAD_ROOMS_COMPLETED
} from '../constants/ActionTypes';

function updateRoom(state, roomId, props) {
  const room = state[roomId];

  return {
    ...state,
    [roomId]: { ...room, ...props }
  };
}

export default function (state = {}, action) {
  switch (action.type) {
  case RECEIVE_MESSAGES:
    return updateRoom(state,
      action.payload.roomId,
      { loaded: true});

  case LOAD_ROOMS_COMPLETED:
    return action.payload.reduce((rooms, room) => {
      rooms[room.id] = room;
      return rooms;
    }, {});

  default:
    return state;
  }
}
