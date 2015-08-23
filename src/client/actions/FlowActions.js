import Flowdock from '../flowdock';
import {
  LOAD_FLOWS_STARTED,
  LOAD_FLOWS_COMPLETED,
  LOAD_FLOWS_FAILED,

  CLOSE_FLOW
} from '../constants/ActionTypes';

export function loadFlowsAsync() {
  return (dispatch) => {
    dispatch({ type: LOAD_FLOWS_STARTED });

    return Flowdock.flows.list()
      .then(
        (result) => dispatch({
          type: LOAD_FLOWS_COMPLETED,
          payload: result
        }),
        (error) => dispatch({
          type: LOAD_FLOWS_FAILED,
          payload: error
        }));
  };
}

export function closeFlow(id) {
  return {
    type: CLOSE_FLOW,
    payload: id
  };
}
