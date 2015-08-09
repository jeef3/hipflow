import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import cx from 'classnames';

import OnlineStatus from './OnlineStatus.jsx';
import RoomList from './RoomList.jsx';
import Button from './Button.react';

function roomsSelect(state) {
  return state.rooms;
}

@connect(roomsSelect)
export default class SideBar extends Component {
  static propTypes = {
    room: PropTypes.object
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { room, flows, privateConversations, dispatch } = this.props;

    return (
      <div className="c-Sidebar">
        <Button>Lobby</Button>

        <div className="c-Sidebar__Channels u-scroller">
          <h3 className="list-title">Flows</h3>
          <RoomList dispatch={dispatch} currentRoom={room} rooms={flows} />

          <h3 className="list-title">1&ndash;to&ndash;1s</h3>
          <RoomList dispatch={dispatch} currentRoom={room} rooms={privateConversations} />
        </div>

        <OnlineStatus />
      </div>
    );
  }
}
