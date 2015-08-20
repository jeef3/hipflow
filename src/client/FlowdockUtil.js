import { loadRoomsAndOpenFirstAsync } from './actions/SyncActions';

export default {
  load: (dispatch) => {
    dispatch(loadRoomsAndOpenFirstAsync());
  }
};
