import Flowdock from '../flowdock';
import {
  LOAD_MESSAGES_STARTED,
  LOAD_MESSAGES_COMPLETED,
  LOAD_MESSAGES_FAILED,

  ADD_MESSAGE,
  EDIT_MESSAGE,
  REMOVE_MESSAGE,
  SEND_MESSAGE_STARTED,
  SEND_MESSAGE_COMPLETED,
  SEND_MESSAGE_FAILED
} from '../constants/ActionTypes';

export function loadMessagesAsync(roomId) {
  return (dispatch, getState) => {
    dispatch({ type: LOAD_MESSAGES_STARTED });

    const room = getState().rooms[roomId];

    var method;
    if (room.access_mode) {
      method = Flowdock
        .flows(
          room.organization.parameterized_name,
          room.parameterized_name)
        .messages
        .list;
    } else {
      method = Flowdock
        .privateConversations(room.id)
        .list;
    }

    return method()
      .then(
        (result) => dispatch({
          type: LOAD_MESSAGES_COMPLETED,
          payload: { roomId, messages: result }
        }),
        (error) => dispatch({
          type: LOAD_MESSAGES_FAILED,
          payload: error
        }));
  };
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: message
  };
}

export function editMessage(id, text) {
  return {
    type: EDIT_MESSAGE,
    payload: { id, text }
  }
}

export function removeMessage(id) {
  return {
    type: REMOVE_MESSAGE,
    payload: id
  };
}

export function sendMessageAsync(message) {
  return (dispatch) => {
    dispatch({
      type: SEND_MESSAGE_STARTED,
      payload: message
    });

    return FlowdockApi.sendMessage(text)
      .then(
        (result) => dispatch({
          type: SEND_MESSAGE_COMPLETED,
          payload: result.data
        }),
        (error) => dispatch({
          type: SEND_MESSAGE_FAILED,
          payload: error
        }));
  }
}
