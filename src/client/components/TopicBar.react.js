import React from 'react';
import {PureRender} from 'reac-purerender';

@PureRender
export default class TopicBar extends React.Component {
  render() {
    const {name, description} = this.props;

    return (
      <div className="c-TopicBar u-truncate">
        <h3 className="c-TopicBar__Name">{name}</h3>
        <span className="c-TopicBar__Description">{description}</span>
      </div>
    )
  }
}
