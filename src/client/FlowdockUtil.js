import {
  initializeAsync,
  showFlowAndLoadMessagesAsync,
  showPrivateConversationAndLoadMessages
} from './actions/AggregateActions';

export default {
  load: (dispatch, getState) => {
    return dispatch(initializeAsync())
      .then(() => {
        const {
          currentRoomId,
          flows,
          privateConversations
        } = getState();

        const room = !currentRoomId ? flows[0] :
          flows.filter(f => f.id === currentRoomId)[0] ||
          privateConversations.filter(pc => pc.id === currentRoomId)[0];

        return room.access_mode ?
          dispatch(showFlowAndLoadMessagesAsync(room.id)) :
          dispatch(showPrivateConversationAndLoadMessages(room.id));
      });
  }
};
