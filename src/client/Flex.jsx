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
    flexGrow: 1,
    alignSelf: 'stretch',
    height: '100%'
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
  static propTypes = {
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    scrollY: PropTypes.bool
  }

  render() : Component {
    const { width, height, scrollY } = this.props;
    const itemStyle = { ...styles.item };

    if (width && typeof width === 'string') {
      itemStyle.maxWidth = width;
    }

    if (height && typeof height === 'string') {
      itemStyle.maxHeight = height;
    }

    if (scrollY) {
      itemStyle.overflowY = 'scroll';
    }

    return (
      <div style={itemStyle}>
        {this.props.children}
      </div>
    );
  }
}
