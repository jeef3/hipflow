import { loadUsersAsync } from './UserActions';
import { loadMessagesAsync } from './MessageActions';
import {
  showRoom,
  loadFlowsAsync,
  loadPrivateConversationsAsync
} from './RoomActions';

export function loadRoomsAndOpenFirstAsync() {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(loadUsersAsync()),
      dispatch(loadFlowsAsync()),
      dispatch(loadPrivateConversationsAsync())
    ]).then(() => {
      const { flows } = getState();
      const flow = flows[0];

      dispatch(loadMessagesAsync('skilitics', flow.parameterized_name));
      dispatch(showRoom(flow.id));
    });
  };
}

