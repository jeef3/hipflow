import Flowdock from '../flowdock';
import {
  FLOWDOCK_STREAM_CONNECTING,
  FLOWDOCK_STREAM_INITIALIZING,
  FLOWDOCK_STREAM_CONNECTED,
  FLOWDOCK_STREAM_DISCONNECTING,
  FLOWDOCK_STREAM_DISCONNECTED,

  MESSAGE_ADDED,
  MESSAGE_EDITED,
  MESSAGE_DELETED,
  USER_ACTIVITY,
  UNHANDLED_STREAM_MESSAGE
} from '../constants/ActionTypes';

export function connectStream(flows) {
  return (dispatch) => {
    dispatch({ type: FLOWDOCK_STREAM_CONNECTING });

    const stream = Flowdock.stream(flows, {
      user: 1,
      active: 'true'
    });

    dispatch({
      type: FLOWDOCK_STREAM_INITIALIZING,
      payload: stream
    });

    stream.onopen(() => {
      dispatch({ type: FLOWDOCK_STREAM_CONNECTED });
    });

    stream.onmessage(message => {
      dispatch(receiveStreamMessage(message));
    });
  };
}

export function disconnectStream() {
  return (dispatch, getState) => {
    const { stream } = getState();

    dispatch({ type: FLOWDOCK_STREAM_DISCONNECTING });

    stream.close();

    dispatch({ type: FLOWDOCK_STREAM_DISCONNECTED });
  };
}

export function receiveStreamMessage(message) {
  return (dispatch) => {
    switch (message.event) {
    case 'message':
    case 'comment':
    case 'file':
    case 'vcs':
    case 'jira':
    case 'mail':
      return dispatch({
        type: MESSAGE_ADDED,
        payload: message
      });

    case 'message-edit':
    case 'tag-change':
      return dispatch({
        type: MESSAGE_EDITED,
        payload: message
      });

    case 'message-delete':
      return dispatch({
        type: MESSAGE_DELETED,
        payload: message
      });

    case 'activity.user':
      return dispatch({
        type: USER_ACTIVITY,
        payload: message
      });

    default:
      return dispatch({
        type: UNHANDLED_STREAM_MESSAGE,
        payload: message
      });
    }
  };
}
