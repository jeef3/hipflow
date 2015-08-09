import Immutable from 'immutable';

import {
  ADD_FLOW,
  REMOVE_FLOW,
  ADD_PRIVATE_CONVERSATION,
  REMOVE_PRIVATE_CONVERSATION,

  LOAD_FLOWS_STARTED,
  LOAD_FLOWS_COMPLETED,
  LOAD_FLOWS_FAILED
} from '../constants/ActionTypes';

export default function (state = {}, action) {
  switch (action.type) {
    case LOAD_FLOWS_COMPLETED:
      return { ...state, flows: action.payload };

    case ADD_FLOW:
      let newFlow = Immutable.Map(action.payload);
      return state
        .update(
          'flows',
          flows => flows.push(newFlow));

    case ADD_PRIVATE_CONVERSATION:
      let newPrivateConversation = Immutable.Map(action.payload);
      return state
        .update(
          'privateConversations',
          pcs => pcs.push(newPrivateConversation));

    default:
      return state;
  }
}
