import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class Button extends Component {
  static propTypes = {
    noFocus: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.any
  }

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
