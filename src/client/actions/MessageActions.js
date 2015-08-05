import FlowdockApi from '../FlowdockApi';
import {
  ADD_MESSAGE,
  EDIT_MESSAGE,
  REMOVE_MESSAGE,
  SEND_MESSAGE_STARTED,
  SEND_MESSAGE_COMPLETED,
  SEND_MESSAGE_FAILED
} from '../constants/ActionTypes';

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
