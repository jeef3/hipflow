import {
  loadFlowsAsync,
  loadPrivateConversationsAsync,
  loadMessagesAsync
} from './actions/RoomActions';

export default {
  sync: (dispatch) => {
    dispatch(loadFlowsAsync());
    dispatch(loadPrivateConversationsAsync());

    dispatch(loadMessagesAsync('skilitics', 'idle-chitchat'));
  }
}
