import {
  FLOWDOCK_STREAM_INITIALIZING,
  FLOWDOCK_STREAM_DISCONNECTED
} from '../constants/ActionTypes';

export default function (state = null, action) {
  switch (action.type) {
  case FLOWDOCK_STREAM_INITIALIZING:
    return action.payload;

  case FLOWDOCK_STREAM_DISCONNECTED:
    return null;

  default:
    return state;
  }
}
