import React, { Component, PropTypes } from 'react';
import PureRender from 'react-purerender';
import Radium from 'radium';

const styles = {
  container: {
    display: 'flex',
    height: '100%'
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },

  item: {
    flexGrow: 1
  }
};

@PureRender
@Radium
export class FlexContainer extends Component {
  static propTypes = {
    direction: PropTypes.oneOf(['row', 'column'])
  }

  render() : Component {
    const { direction } = this.props;

    return (
      <div style={[
        styles.container,
        styles[direction]
      ]}>
        {this.props.children}
      </div>
    );
  }
}

export class FlexItem extends Component {
  render() : Component {
    return (
      <div style={styles.item}>
        {this.props.children}
      </div>
    );
  }
}
