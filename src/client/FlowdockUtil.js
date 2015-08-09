import {
  loadFlowsAsync,
  loadPrivateConversationsAsync
} from './actions/RoomActions';

export default {
  sync: (dispatch) => {
    dispatch(loadFlowsAsync());
    dispatch(loadPrivateConversationsAsync());
  }
}
