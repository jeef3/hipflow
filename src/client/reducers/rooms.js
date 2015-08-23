import {
  LOAD_ROOMS_COMPLETED
} from '../constants/ActionTypes';

export default function (state = {}, action) {
  switch (action.type) {
  case LOAD_ROOMS_COMPLETED:
    return action.payload.reduce((rooms, room) => {
      rooms[room.id] = room;
      return rooms;
    }, {});

  default:
    return state;
  }
}
