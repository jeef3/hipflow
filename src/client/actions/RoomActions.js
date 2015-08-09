import Flowdock from '../flowdock';
import {
  LOAD_FLOWS_STARTED,
  LOAD_FLOWS_COMPLETED,
  LOAD_FLOWS_FAILED,
  SHOW_ROOM,
  CLOSE_ROOM
} from '../constants/ActionTypes';

export function loadFlowsAsync() {
  return (dispatch) => {
    dispatch({ type: LOAD_FLOWS_STARTED });

    return Flowdock.flows.list()
      .then(
        (result) => dispatch({
          type: LOAD_FLOWS_COMPLETED,
          payload: result
        }),
        (error) => dispatch({
          type: LOAD_FLOWS_FAILED,
          payload: error
        }));
  }
}

export function showRoom(id) {
  return {
    type: SHOW_ROOM,
    id
  };
}

export function closeRoom(id) {
  return {
    type: CLOSE_ROOM,
    id
  };
}
