import React, { Component, PropTypes } from 'react';

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};

export default class Scroller extends Component {
  static propTypes = {
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool
  }

  render() : Component {
    const { vertical, horizontal } = this.props;
    var scrollStyles = {
      ...styles.container,

      overflowY: vertical ? 'scroll' : 'visible',
      overflowX: horizontal ? 'scroll' : 'visible'
    };

    return <div style={scrollStyles}>{this.props.children}</div>;
  }
}
