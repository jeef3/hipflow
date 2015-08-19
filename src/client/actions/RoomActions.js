import Flowdock from '../flowdock';
import { loadMessagesAsync } from './MessageActions';
import {
  LOAD_FLOWS_STARTED,
  LOAD_FLOWS_COMPLETED,
  LOAD_FLOWS_FAILED,

  LOAD_PRIVATE_CONVERSATIONS_STARTED,
  LOAD_PRIVATE_CONVERSATIONS_COMPLETED,
  LOAD_PRIVATE_CONVERSATIONS_FAILED,

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
  };
}

export function loadPrivateConversationsAsync() {
  return (dispatch) => {
    dispatch({ type: LOAD_PRIVATE_CONVERSATIONS_STARTED });

    return Flowdock.privateConversations.list()
      .then(
        (result) => dispatch({
          type: LOAD_PRIVATE_CONVERSATIONS_COMPLETED,
          payload: result
        }),
        (error) => dispatch({
          type: LOAD_PRIVATE_CONVERSATIONS_FAILED,
          payload: error
        }));
  };
}

export function loadRoomsAndOpenFirstAsync() {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(loadFlowsAsync()),
      dispatch(loadPrivateConversationsAsync())
    ]).then(() => {
      const { flows } = getState();
      const flow = flows[0];

      dispatch(loadMessagesAsync('skilitics', flow.parameterized_name));
      dispatch(showRoom(flow.id));
    });
  };
}

export function showRoom(id) {
  return {
    type: SHOW_ROOM,
    payload: id
  };
}

export function closeRoom(id) {
  return {
    type: CLOSE_ROOM,
    payload: id
  };
}
