import React, { Component, PropTypes } from 'react';
import { PureRender } from 'react-purerender';

// @PureRender
export default class TopicBar extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }

  render() {
    const { name, description } = this.props;

    return (
      <div className="c-TopicBar u-truncate">
        <h3 className="c-TopicBar__Name">{name}</h3>
        <span className="c-TopicBar__Description">{description}</span>
      </div>
    );
  }
}
