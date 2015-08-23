import { SHOW_ROOM } from '../constants/ActionTypes';

export function showRoom(id) {
  return {
    type: SHOW_ROOM,
    payload: id
  };
}
