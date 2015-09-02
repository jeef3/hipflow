import { loadUsersAsync } from './UserActions';
import { fetchMessagesAsync } from './MessageActions';
import {
  showRoom,
  loadRoomsAsync
} from './RoomActions';

/*
 * Initial minimal data loading
 */
export function initializeAsync() {
  return (dispatch) => {
    return Promise.all([
      dispatch(loadUsersAsync()),
      dispatch(loadRoomsAsync())
    ]);
  };
}

export function showRoomAndLoadMessagesAsync(roomId) {
  return (dispatch) => {
    dispatch(showRoom(roomId));
    return dispatch(fetchMessagesAsync(roomId));
  };
}
