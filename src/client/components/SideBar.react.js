'use strict';

import React from 'react';
import cx from 'classnames';

import RoomActions from '../actions/RoomActions';
import RoomStore from '../stores/RoomStore';
import OnlineStatus from './OnlineStatus.react';
import Button from './Button.react';
import Icon from './Icon.react';

function getState() {
  return {
    flows: RoomStore.openFlows(),
    privateConversations: RoomStore.openPrivateConversations(),
  };
}

class SideBar extends React.Component {
  constructor() {
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
      <div className="c-Sidebar">
        <Button>Lobby</Button>

        <div className="c-Sidebar__Channels u-scroller">
          <h3 className="list-title">Flows</h3>
          <SideBar.RoomList currentRoom={this.props.room} rooms={this.state.flows} />

          <h3 className="list-title">1&ndash;to&ndash;1s</h3>
          <SideBar.RoomList currentRoom={this.props.room} rooms={this.state.privateConversations} />
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
      var currentRoom = this.props.currentRoom || {};

      return (
        <ul className="c-Sidebar__RoomList">
          {this.props.rooms.map((room) => {
            return (
              <li key={room.id}
                  className={cx('c-Sidebar__Room u-truncate', {
                    'is-active': room.id === currentRoom.id,
                    'has-unread': room.hasUnread() })}>

                <Button
                    noFocus="true"
                    className="c-Sidebar__ShowRoomButton"
                    onClick={this._handleShow.bind(this, room)}>
                  <Icon kind="comments-o" className="room__icon" /> {room.name}
                  <Icon kind="circle" className="unread-marker" />
                </Button>

                <Button
                    noFocus="true"
                    className="c-Sidebar__CloseRoomButton"
                    onClick={this._handleClose.bind(this, room)}>
                  <Icon kind="times" />
                </Button>
            </li>
            );
          }, this)}
        </ul>
      )
    }

    _handleShow(room) {
      RoomActions.showRoom(room);
    }

    _handleClose(room) {
      RoomActions.closeRoom(room);
    }
  }

export default SideBar;
