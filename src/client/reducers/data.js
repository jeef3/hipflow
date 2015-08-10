import Immutable from 'immutable';

import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  UPDATE_MESSAGE,

  ADD_FLOW,
  REMOVE_FLOW,
  ADD_PRIVATE_CONVERSATION,
  REMOVE_PRIVATE_CONVERSATION,

  SEND_MESSAGE_STARTED,
  SEND_MESSAGE_COMPLETED,
  SEND_MESSAGE_FAILED,

  LOAD_FLOWS_COMPLETED,
  LOAD_PRIVATE_CONVERSATIONS_COMPLETED
} from '../constants/ActionTypes';

const initialState = {
  flows: [],
  privateConversations: [],

  messages: Immutable.Map()
}

function getRoomForMessage(roomsList, message) {
  let roomId = FlowdockUtil.roomIdFromMessage(message);

  return roomsList.reduce((room, roomList) => {
    return roomList.filter(r => r.id === roomId)[0] || room;
  }, null);
}

export default function (state = initialState, action) {
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

    case SEND_MESSAGE_STARTED:
    case ADD_MESSAGE:
      let newMessage = Immutable.Map(action.payload)
      let room = getRoomForMessage([
        state.flows,
        state.privateConversations
      ], message);

      // state.messages[room.id]

      return room
        .update(
          'messages',
          messages => messages.push(newMessage));

    case REMOVE_MESSAGE:
      return state
        .update(
          'messages',
          messages => messages.filter(m => m.id !== action.payload));

    case SEND_MESSAGE_COMPLETED:
    case UPDATE_MESSAGE:
      // TODO: Update existing message
      return state;

    case SEND_MESSAGE_FAILED:
      // TODO: Alert user that send has failed? Retry?
      return state;

    default:
      return state;
  }
}
