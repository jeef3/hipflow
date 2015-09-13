import React from 'react';
import cx from 'classnames';

export default ({ kind, className }) => (
  <i className={cx(
    'fa fa-fw',
    `fa-${kind}`,
    className)} />
);
