import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  UPDATE_MESSAGE,

  SEND_MESSAGE_STARTED,
  SEND_MESSAGE_COMPLETED,
  SEND_MESSAGE_FAILED,

  RECEIVE_MESSAGES
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

function addOrUpdate(log, message) {
  let existing = log.filter(l => l.id === message.id)[0];

  let m = processMessage(message);

  if (existing) {
    let existingIndex = log.indexOf(existing);
    log[existingIndex] = m;
  } else {
    log.push(m);
  }
}

function sortMessages(log) {
  log.sort((m1, m2) => m1.sent - m2.sent);
}

function cloneLog(messages, roomId) {
  return messages[roomId] ? messages[roomId].slice() : [];
}

export default function (state = {}, action) {
  switch (action.type) {
  case RECEIVE_MESSAGES:
    const { roomId, messages, append } = action.payload;

    var log;
    if (append) {
      log = cloneLog(state, roomId);
      messages.forEach(m => addOrUpdate(log, m));
      sortMessages(log);
    } else {
      log = messages;
    }

    return {
      ...state,
      [roomId]: log
    };

  case SEND_MESSAGE_STARTED:
  case ADD_MESSAGE:
    let message = action.payload;
    let aroomId = message.flow || message.to;

    let alog = cloneLog(state, aroomId);
    addOrUpdate(alog, message);
    // TODO: Only sort if the message was not appended
    sortMessages(alog);

    return {
      ...state,
      [aroomId]: alog
    };

  case REMOVE_MESSAGE:
    return state;

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
