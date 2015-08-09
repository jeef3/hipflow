import Immutable from 'immutable';

import {
  ADD_FLOW,
  REMOVE_FLOW,
  ADD_PRIVATE_CONVERSATION,
  REMOVE_PRIVATE_CONVERSATION,

  LOAD_FLOWS_COMPLETED,
  LOAD_PRIVATE_CONVERSATIONS_COMPLETED
} from '../constants/ActionTypes';

const initialState = {
  flows: [],
  privateConversations: []
}

export default function (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case LOAD_FLOWS_COMPLETED:
      return { ...state, flows: action.payload };

    case LOAD_PRIVATE_CONVERSATIONS_COMPLETED:
      return { ...state, privateConversations: action.payload };

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
