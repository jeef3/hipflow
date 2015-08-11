import {
  ADD_PRIVATE_CONVERSATION,
  REMOVE_PRIVATE_CONVERSATION,

  LOAD_PRIVATE_CONVERSATIONS_COMPLETED
} from '../constants/ActionTypes';

export default function (state = [], action) {
  switch (action.type) {
    case LOAD_PRIVATE_CONVERSATIONS_COMPLETED:
      return action.payload;

    case ADD_PRIVATE_CONVERSATION:
      let newPrivateConversation = action.payload;
      return state
        .update(
          'privateConversations',
          pcs => pcs.push(newPrivateConversation));

    default:
      return state;
  }
}
