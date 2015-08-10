import {
  loadFlowsAsync,
  loadPrivateConversationsAsync,
  loadMessagesForRoomAsync
} from './actions/RoomActions';

export default {
  sync: (dispatch) => {
    dispatch(loadFlowsAsync());
    dispatch(loadPrivateConversationsAsync());

    dispatch(loadMessagesForRoomAsync('skilitics', 'idle-chit-chat'));
  }
}
