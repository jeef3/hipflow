'use strict';

import React from 'react';
import cx from 'classnames';

import RoomActions from '../actions/RoomActions';
import RoomStore from '../stores/RoomStore';
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
      <div className="c-Sidebar">
        <button className="lobby btn btn--sidebar"
            type="button">Lobby</button>

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
    constructor() {
      this._handleShow = this._handleShow.bind(this);
      this._handleClose = this._handleClose.bind(this);
    }

    render() {
      var currentRoom = this.props.currentRoom || {};

      return (
        <ul className="c-Sidebar__RoomList">
          {this.props.rooms.map((room) => {
            return (
              <li key={room.id}
                  className={cx('Sidebar__RoomListRoom u-truncate', {
                    'is-active': room.id === currentRoom.id,
                    'has-unread': room.hasUnread() })}>

                <button className="c-Btn c-Btn--NoFocus btn--sidebar room__join-btn'"
                    type="button"
                    onClick={(e) => { this._handleShow(e, room); }}>
                  <i className="fa fa-fw fa-comments-o room__icon"></i>
                  {room.name}
                  <i className="fa fa-fw fa-circle unread-marker"></i>
                </button>

                <button type="button"
                    className="c-Btn c-Btn--NoFocus room__close-btn"
                    onClick={(e) => { this._handleClose(e, room); }}>
                  <i className="fa fa-fw fa-times"></i>
                </button>
            </li>
            );
          }, this)}
        </ul>
      )
    }

    _handleShow(e, room) {
      RoomActions.showRoom(room);
    }

    _handleClose(e, room) {
      RoomActions.closeRoom(room);
    }
  }

export default SideBar;
