import Flowdock from '../flowdock';
import {
  LOAD_USERS_STARTED,
  LOAD_USERS_COMPLETED,
  LOAD_USERS_FAILED
} from '../constants/ActionTypes';

export function loadUsersAsync() {
  return (dispatch) => {
    dispatch({ type: LOAD_USERS_STARTED });

    return Flowdock.users.list()
      .then(
        (result) => dispatch({
          type: LOAD_USERS_COMPLETED,
          payload: result
        }),
        (error) => dispatch({
          type: LOAD_USERS_FAILED,
          payload: error
        }));
  };
}
