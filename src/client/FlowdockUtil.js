import {
  loadFlowsAsync,
  loadPrivateConversationsAsync,
} from './actions/RoomActions';

import {
  loadMessagesAsync
} from './actions/MessageActions';

export default {
  sync: (dispatch) => {
    dispatch(loadFlowsAsync());
    dispatch(loadPrivateConversationsAsync());

    dispatch(loadMessagesAsync('skilitics', 'idle-chitchat'));
  }
};
