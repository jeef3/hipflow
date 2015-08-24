import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  UPDATE_MESSAGE,

  SEND_MESSAGE_STARTED,
  SEND_MESSAGE_COMPLETED,
  SEND_MESSAGE_FAILED,

  LOAD_MESSAGES_COMPLETED
} from '../constants/ActionTypes';

function processMessage(message) {
  const { tags } = message;

  if (!tags) { return message; }

  const meId = 1;

  return {
    ...message,
    highlight: tags.indexOf(':highlight:' + meId) !== -1,
    mentionsMe: tags.indexOf(':user:' + meId) !== -1,
    thread: tags.indexOf(':thread') !== -1
  };
}

export default function (state = {}, action) {
  switch (action.type) {
  case LOAD_MESSAGES_COMPLETED:
    const { roomId, messages } = action.payload;

    // TODO: Proper look into messages and merge
    return {
      ...state,
      [roomId]: (state[roomId] || []).concat(messages.map(processMessage))
    };

  case SEND_MESSAGE_STARTED:
  case ADD_MESSAGE:
    let newMessage = action.payload;
    // let room = getRoomForMessage([
    //   state.flows,
    //   state.privateConversations
    // ], message);

    // state.messages[room.id]

    return state
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
