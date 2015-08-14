import { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import UserList from './UserList.jsx';

export default class ChatContext extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  static propTypes = {
    currentRoom: PropTypes.object,
    users: PropTypes.object
  }

  render() {
    const { currentRoom, users } = this.props;

    var contextHtml;
    if (users) {
      contextHtml = <UserList users={users} />;
    } else {
      let user = currentRoom.users[1];
      let avatarUrl = user.avatar + '/316';

      contextHtml = (
        <div
          className="c-ChatContext__User o-avatar o-avatar--large"
          title={user.name}
          style={{backgroundImage: `url(${avatarUrl})`}} />
      );
    }

    return (
      <aside className="c-ChatContext">
        {contextHtml}
      </aside>
   );
  }
}
