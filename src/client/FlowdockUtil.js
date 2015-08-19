import { loadRoomsAndOpenFirstAsync } from './actions/RoomActions';

export default {
  load: (dispatch) => {
    dispatch(loadRoomsAndOpenFirstAsync());
  }
};
