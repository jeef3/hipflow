import Flowdock from '../flowdock';
import {
  REQUEST_MESSAGES,
  RECEIVE_MESSAGES,
  FETCH_MESSAGES_FAILED,

  ADD_MESSAGE,
  EDIT_MESSAGE,
  REMOVE_MESSAGE,
  SEND_MESSAGE_STARTED,
  SEND_MESSAGE_COMPLETED,
  SEND_MESSAGE_FAILED
} from '../constants/ActionTypes';

export function requestMessages(roomId, options) {
  return {
    type: REQUEST_MESSAGES,
    payload: { roomId, options }
  };
}

export function receiveMessages(roomId, messages, append) {
  return {
    type: RECEIVE_MESSAGES,
    payload: { roomId, messages, append }
  };
}

function getFetchMethod(room) {
  if (room.access_mode) {
    return Flowdock
      .flows(room.organization.parameterized_name, room.parameterized_name)
      .messages
      .list;
  } else {
    return Flowdock
      .privateConversations(room.id)
      .messages
      .list;
  }
}

export function fetchMessagesSince(roomId, sinceId) {
  return fetchMessagesAsync(roomId, { since: sinceId });
}

export function fetchMessagesUntil(roomId, untilId) {
  return fetchMessagesAsync(roomId, { until: untilId });
}

export function fetchMessagesAsync(roomId, options) {
  return (dispatch, getState) => {
    dispatch(requestMessages(roomId, options));

    const room = getState().rooms[roomId];
    const append = options && options.since;

    return getFetchMethod(room)()
      .then(
        (result) => dispatch(receiveMessages(roomId, result, append)),
        (error) => dispatch({
          type: FETCH_MESSAGES_FAILED,
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
  };
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

    return Flowdock.sendMessage(message)
      .then(
        (result) => dispatch({
          type: SEND_MESSAGE_COMPLETED,
          payload: result.data
        }),
        (error) => dispatch({
          type: SEND_MESSAGE_FAILED,
          payload: error
        }));
  };
}
