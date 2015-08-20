import React, { Component, PropTypes } from 'react';

export default class Plain extends Component {
  render() : Component {
    const { message } = this.props;
    return <p className='plain-message'>{message.content}</p>;
  }
}
