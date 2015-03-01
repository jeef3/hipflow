'use strict';

import React from 'react/addons';

import Rooms from '../rooms';
import MessageWindowManager from '../message-window';

export default
  class SideBar extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        flows: Rooms.openFlows(),
        privateConversations: Rooms.openPrivateConversations(),

        currentRoom: MessageWindowManager.getActive()
      };

      Rooms.on('flows_updated', () => {
        this.setState({ flows: Rooms.openFlows() });
      });

      Rooms.on('privateConversations_updated', () => {
        this.setState({ privateConversations: Rooms.openPrivateConversations() });
      });

      MessageWindowManager.on('show_room', (room) => {
        this.setState({ currentRoom: room });
      });
    }

    render() {
      return (
        <div className="sidebar">
          <button className="lobby btn btn--sidebar"
              type="button">Lobby</button>

          <div className="channels scroll-container">
            <h3 className="list-title">Flows</h3>
            <SideBar.RoomList rooms={this.state.flows} />

            <h3 className="list-title">1&ndash;to&ndash;1s</h3>
            <SideBar.RoomList rooms={this.state.privateConversations} />
          </div>
        </div>
      );
    }
  }

SideBar.RoomList =
  class RoomList extends React.Component {
    render() {
      return (
        <ul className="room-list">
          {this.props.rooms.map(function (room) {
            return <SideBar.Room key={room.id} room={room} />;
          })}
        </ul>
      );
    }
  }

SideBar.Room =
  class Room extends React.Component {
    constructor() {
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }

    handleShow() {
      MessageWindowManager.setActive(this.props.room);
    }

    handleClose() {
      console.log('close room', this.props.room);
    }

    render() {
      var room = this.props.room;

      var classes = React.addons.classSet({
        'room': true,
        'active': room === MessageWindowManager.getActive(),
        'unread': room.hasUnread()
      });

      return (
        <li className={classes}>
          <button className="btn--sidebar room__join-btn'"
              type="button"
              onClick={this.handleShow}>
            <i className="fa fa-fw fa-comments-o room__icon"></i>
            {room.name}
            <i className="fa fa-fw fa-circle unread-marker"></i>
          </button>

          <button type="button"
              className="btn room__close-btn"
              onClick={this.handleClose}>
            <i className="fa fa-fw fa-times"></i>
          </button>
        </li>
      );
    }
  }
