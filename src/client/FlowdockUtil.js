import { connectStream } from './actions/FlowdockActions';
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

        // Connect to the stream
        const openFlows = flows
          .map(f => rooms[f])
          .filter(f => f.open);

        dispatch(connectStream(openFlows));

        // Select the current room, or first Flow
        const room = currentRoomId ?
          rooms[currentRoomId] :
          rooms[flows[0]];

        return dispatch(showRoomAndLoadMessagesAsync(room.id));
      });
  }
};
