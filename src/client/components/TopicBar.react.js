'use strict';

import React from 'react';

class TopicBar extends React.Component {
  render() {
    return (
      <div className="c-TopicBar u-truncate">
        <h3 className="c-TopicBar__Name">{this.props.name}</h3>
        <span className="c-TopicBar__Description">{this.props.description}</span>
      </div>
    )
  }
}

export default TopicBar;
