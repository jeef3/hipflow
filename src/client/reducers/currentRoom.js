import { SHOW_ROOM } from '../constants/ActionTypes';

export default function (state = '', action) {
  switch (action.type) {
    case SHOW_ROOM:
      return action.payload;

    default:
      return state;
  }
}
