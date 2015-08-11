import {
  ADD_FLOW,
  REMOVE_FLOW,

  LOAD_FLOWS_COMPLETED
} from '../constants/ActionTypes';

export default function (state = [], action) {
  switch (action.type) {
    case LOAD_FLOWS_COMPLETED:
      return action.payload;

    case ADD_FLOW:
      let newFlow = action.payload;
      return state
        .update(
          'flows',
          flows => flows.push(newFlow));

    default:
      return state;
  }
}
