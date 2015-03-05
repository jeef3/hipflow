'use strict';

import React from 'react';

class TopicBar extends React.Component {
  render() {
    return (
      <div className="topic-bar">
        <span className="topic-bar__room-name">{this.props.name}</span>
        <span className="topic-bar__room-description">{this.props.description}</span>
      </div>
    )
  }
}

export  default TopicBar;
