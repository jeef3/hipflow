import React from 'react';
import cx from 'classnames';

export default ({ user }) => (
  <li
    title={user.name}
    style={{backgroundImage: 'url(' + user.avatar + '/60)'}}
    className={cx('c-ChatContext__User o-avatar', {
      'is-online': user.isOnline(),
      'is-offline': !user.isOnline() })} />
);
