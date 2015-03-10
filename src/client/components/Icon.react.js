'use strict';

import React from 'react';
import cx from 'classnames';

class Icon extends React.Component {
  render() {
    return (
      <i className={cx('fa fa-fw',
          `fa-${this.props.kind}`,
          this.props.className)}></i>
    );
  }
}

export default Icon;
