'use strict';

import React from 'react';
import cx from 'classnames';

class Button extends React.Component {
  render() {
    return (
      <button {...this.props}
          className={cx('c-Button',
            this.props.className, {
              'c-Button--NoFocus': this.props.noFocus })}>
        {this.props.children}</button>
    );
  }
}

export default Button;
