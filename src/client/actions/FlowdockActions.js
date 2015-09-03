import Flowdock from '../flowdock';
import {
  FLOWDOCK_STREAM_CONNECTING,
  FLOWDOCK_STREAM_INITIALIZING,
  FLOWDOCK_STREAM_CONNECTED,
  FLOWDOCK_STREAM_DISCONNECTING,
  FLOWDOCK_STREAM_DISCONNECTED,

  FLOWDOCK_RECEIVE_STREAM_MESSAGE
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
  return {
    type: FLOWDOCK_RECEIVE_STREAM_MESSAGE,
    payload: message
  };
}
