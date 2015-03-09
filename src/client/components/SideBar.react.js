'use strict';

import React from 'react';
import cx from 'classnames';

import RoomActions from '../actions/RoomActions';
import RoomStore from '../stores/RoomStore';
import MessageWindowStore from '../stores/MessageWindowStore';
import OnlineStatus from './OnlineStatus.react';

function getState() {
  return {
    flows: RoomStore.openFlows(),
    privateConversations: RoomStore.openPrivateConversations(),
  };
}

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = getState();

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    RoomStore.on('flows_updated', this._onChange);
    RoomStore.on('private_conversations_updated', this._onChange);
  }

  componentWillUnmount() {
    RoomStore.off('flows_updated', this._onChange);
    RoomStore.off('private_conversations_updated', this._onChange);
  }

  render() {
    return (
      <div className="sidebar">
        <button className="lobby btn btn--sidebar"
            type="button">Lobby</button>

        <div className="channels scroll-container">
          <h3 className="list-title">Flows</h3>
          <SideBar.RoomList currentRoom={this.props.room} rooms={this.state.flows} />

          <h3 className="list-title">1&ndash;to&ndash;1s</h3>
          <SideBar.RoomList currentroom={this.props.room} rooms={this.state.privateConversations} />
        </div>

        <OnlineStatus />
      </div>
    );
  }

  _onChange() {
    this.setState(getState());
  }
}

SideBar.RoomList =
  class RoomList extends React.Component {
    render() {
      return (
        <ul className="room-list">
          {this.props.rooms.map((room) => {
            return <SideBar.Room key={room.id} room={room} currentRoom={this.props.currentRoom} />;
          })}
        </ul>
      )
    }
  }

SideBar.Room =
  class Room extends React.Component {
    constructor() {
      this._handleShow = this._handleShow.bind(this);
      this._handleClose = this._handleClose.bind(this);
    }

    render() {
      var room = this.props.room;

      return (
        <li className={cx('room truncate', {
            'active': room === this.props.currentroom,
            'unread': room.hasUnread()
          })}>
          <button className="btn btn--no-focus btn--sidebar room__join-btn'"
              type="button"
              onClick={this._handleShow}>
            <i className="fa fa-fw fa-comments-o room__icon"></i>
            {room.name}
            <i className="fa fa-fw fa-circle unread-marker"></i>
          </button>

          <button type="button"
              className="btn btn--no-focus room__close-btn"
              onClick={this._handleClose}>
            <i className="fa fa-fw fa-times"></i>
          </button>
        </li>
      );
    }

    _handleShow() {
      RoomActions.showRoom(this.props.room);
    }

    _handleClose() {
      RoomActions.closeRoom(this.props.room);
    }
  }

export default SideBar;
