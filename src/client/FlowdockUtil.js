import {
  initializeAsync,
  showRoomAndLoadMessagesAsync,
} from './actions/AggregateActions';

export default {
  load: (dispatch, getState) => {
    return dispatch(initializeAsync())
      .then(() => {
        const {
          currentRoomId,
          rooms,
          flows
        } = getState();

        // Select the current room, or first Flow
        const room = currentRoomId ?
          rooms[currentRoomId] :
          rooms[flows[0]];

        return dispatch(showRoomAndLoadMessagesAsync(room.id));
      });
  }
};
