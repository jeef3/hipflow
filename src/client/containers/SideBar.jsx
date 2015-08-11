import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import cx from 'classnames';

import OnlineStatus from '../components/OnlineStatus.jsx';
import RoomList from '../components/RoomList.jsx';
import Button from '../components/Button.react';

function roomsSelect(state) {
  return {
    currentRoom: state.currentRoom,

    flows: state.flows,
    privateConversations: state.privateConversations
  };
}

@connect(roomsSelect)
export default class SideBar extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {
      currentRoom,
      flows,
      privateConversations,
      dispatch
    } = this.props;

    return (
      <div className="c-Sidebar">
        <Button>Lobby</Button>

        <div className="c-Sidebar__Channels u-scroller">
          <h3 className="list-title">Flows</h3>
          <RoomList dispatch={dispatch} currentRoom={currentRoom} rooms={flows} />

          <h3 className="list-title">1&ndash;to&ndash;1s</h3>
          <RoomList dispatch={dispatch} currentRoom={currentRoom} rooms={privateConversations} />
        </div>

        <OnlineStatus />
      </div>
    );
  }
}
