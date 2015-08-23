import Flowdock from '../flowdock';
import {
  SHOW_ROOM,
  CLOSE_ROOM,

  LOAD_ROOMS_STARTED,
  LOAD_ROOMS_COMPLETED,
  LOAD_ROOMS_FAILED
} from '../constants/ActionTypes';

export function loadRoomsAsync() {
  return (dispatch) => {
    dispatch({ type: LOAD_ROOMS_STARTED });

    return Promise
      .all([
        Flowdock.flows.list(),
        Flowdock.privateConversations.list()
      ])
      .then(
        (results) => dispatch({
          type: LOAD_ROOMS_COMPLETED,
          payload: [].concat(...results)
        }),
        (error) => dispatch({
          type: LOAD_ROOMS_FAILED,
          payload: error
        })
      );
  };
}

export function showRoom(id) {
  return {
    type: SHOW_ROOM,
    payload: id
  };
}

export function closeFlow(id) {
  return {
    type: CLOSE_ROOM,
    payload: id
  };
}
