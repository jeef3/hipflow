import React, { Component, PropTypes }  from 'react';
import cx from 'classnames';

class Icon extends Component {
  static propTypes = {
    kind: PropTypes.string.isRequired,
    className: PropTypes.any
  }

  render() {
    return (
      <i className={cx('fa fa-fw',
          `fa-${this.props.kind}`,
          this.props.className)}></i>
    );
  }
}

export default Icon;
