import { LOAD_USERS_COMPLETED } from '../constants/ActionTypes';

export default function (state = {}, action) {
  switch (action.type) {
  case LOAD_USERS_COMPLETED:
    let users = {};
    action.payload.forEach(u => users[u.id] = u);
    return users;

  default:
    return state;
  }
}
