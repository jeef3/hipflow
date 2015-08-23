export function getMetadata(message, users) {
  if (message.event === 'message' ||
      message.event === 'comment' ||
      message.event === 'file') {

    let user = users[message.user] || {};

    return {
      author: user.name,
      avatar: user.avatar + '60'
    };
  }

  switch (message.event) {
  case 'jira':
    return {
      author: 'JIRA',
      avatar: '/images/jira/avatar.png'
    };
  case 'vcs':
    return {
      author: 'GitHub',
      avatar: '/images/github/avatar.png'
    };
  case 'trello':
    return {
      author: 'Trello',
      avatar: '/images/trello/avatar.png'
    };
  }
}

function isMe(user) {
  return false;
}

export function isMonologue(current, previous) {
  if (current.user === '0') {
    return previous && current.event === previous.event;
  } else {
    return previous &&
      current.user === previous.user &&
      current.app === previous.app;
  }
}

export function isSameDay(current, previous) {
  if (!previous) {
    return true;
  }

  return new Date(current.sent).getDate() === new Date(previous.sent).getDate();
}
