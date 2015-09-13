import React from 'react';

import User from './User.jsx';

export default ({ users }) => (
  <ul className="c-ChatContext__Users">
    {users.map(user => <User key={user.id} user={user} />)}
  </ul>
);
