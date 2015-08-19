import React, { Component, PropTypes } from 'react';

export default class Scroller extends Component {
  static propTypes = {
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool
  }

  render() : Component {
    const { vertical, horizontal } = this.props;
    var styles = {
      overflowY: vertical ? 'scroll' : 'hidden',
      overflowX: horizontal ? 'scroll' : 'hidden'
    };

    return <div style={styles}>{this.props.children}</div>;
  }
}
