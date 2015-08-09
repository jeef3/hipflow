import { loadFlowsAsync } from './actions/RoomActions';

export default {
  sync: (dispatch) => {
    dispatch(loadFlowsAsync());
  }
}
