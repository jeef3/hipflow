import Immutable from 'immutable';

import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  UPDATE_MESSAGE,
  SEND_MESSAGE_STARTED,
  SEND_MESSAGE_COMPLETED,
  SEND_MESSAGE_FAILED
} from '../constants/ActionTypes';

function getRoomForMessage(roomsList, message) {
  let roomId = FlowdockUtil.roomIdFromMessage(message);

  return roomsList.reduce((room, roomList) => {
    return roomList.filter(r => r.id === roomId)[0] || room;
  }, null);
}

export default function (state = {}, action) {
  switch (action.type) {
    case SEND_MESSAGE_STARTED:
    case ADD_MESSAGE:
      let newMessage = Immutable.Map(action.payload)
      let room = getRoomForMessage([
        state.flows,
        state.privateConversations
      ], message);

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
