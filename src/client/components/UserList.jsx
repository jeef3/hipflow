import { Component, PropTypes } from 'react';

import User from './User.jsx';

export default class UserList extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired
  }

  render() : Component {
    const { users } = this.props;

    return (
      <ul className="c-ChatContext__Users">
        {users.map(user => <User key={user.id} user={user} />)}
      </ul>
    );
  }
}
