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
    position: 'relative',
    height: '100%'
  }
};

function getSizeValue(size) {
  if (!size) {
    return null;
  }

  if (size) {
    switch (typeof size) {
      case 'number':
        return `${size}px`;
      case 'string':
        return size;
      case 'object':
        // TODO: Responsive
        return size['*'];
    }
  }
}

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
      PropTypes.number,
      PropTypes.string,
      PropTypes.object
    ]),

    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object
    ]),

    scrollY: PropTypes.bool
  }

  render() : Component {
    const { width, height } = this.props;

    const widthValue = getSizeValue(width);
    const heightValue = getSizeValue(height);

    var itemStyle = { ...styles.item };

    if (widthValue) {
      itemStyle.maxWidth = widthValue;
    }

    if (height) {
      itemStyle.maxHeight = heightValue;
    }

    return (
      <div style={itemStyle}>
        {this.props.children}
      </div>
    );
  }
}
