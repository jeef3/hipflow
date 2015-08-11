import Flowdock from '../flowdock';
import {
  LOAD_FLOWS_STARTED,
  LOAD_FLOWS_COMPLETED,
  LOAD_FLOWS_FAILED,

  LOAD_PRIVATE_CONVERSATIONS_STARTED,
  LOAD_PRIVATE_CONVERSATIONS_COMPLETED,
  LOAD_PRIVATE_CONVERSATIONS_FAILED,

  LOAD_MESSAGES_STARTED,
  LOAD_MESSAGES_COMPLETED,
  LOAD_MESSAGES_FAILED,

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
  }
}

export function loadMessagesAsync(organizationName, flowName) {
  return (dispatch) => {
    dispatch({ type: LOAD_MESSAGES_STARTED });

    return Flowdock.flows(organizationName, flowName).messages.list()
      .then(
        (result) => dispatch({
          type: LOAD_MESSAGES_COMPLETED,
          payload: { flow: flowName, messages: result }
        }),
        (error) => dispatch({
          type: LOAD_MESSAGES_FAILED,
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
