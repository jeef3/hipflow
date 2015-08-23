import Flowdock from '../flowdock';
import {
  LOAD_PRIVATE_CONVERSATIONS_STARTED,
  LOAD_PRIVATE_CONVERSATIONS_COMPLETED,
  LOAD_PRIVATE_CONVERSATIONS_FAILED,

  CLOSE_PRIVATE_CONVERSATION
} from '../constants/ActionTypes';

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

export function closePrivateConversation(id) {
  return {
    type: CLOSE_PRIVATE_CONVERSATION,
    payload: id
  };
}
