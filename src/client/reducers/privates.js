import {
  LOAD_ROOMS_COMPLETED
} from '../constants/ActionTypes';

export default function (state = [], action) {
  switch (action.type) {
  case LOAD_ROOMS_COMPLETED:
    return action.payload
      .filter(r => !r.access_mode)
      .map(f => f.id);

  default:
    return state;
  }
}
