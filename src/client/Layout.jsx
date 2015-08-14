import React, { Component, PropTypes } from 'react';

const styles = {
  sidebar: {
    position: 'absolute',
    width: '13.125em',

    top: 0,
    bottom: 0,
    left: 0
  },
  chatContext: {}
};

export default class Layout extends Component {
  static propTypes = {
    item: PropTypes.string.isRequired
  }

  render() : Component {
    return <div style={styles.sidebar}>{this.props.children}</div>;
  }
}
