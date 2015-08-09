import React from 'react';
import PureRender from 'react-purerender';
import { connect } from 'react-redux';
import cx from 'classnames';

import OnlineStatus from './OnlineStatus.jsx';
import RoomList from './RoomList.jsx';
import Button from './Button.react';

@connect(state => ({
  flows: state.rooms.flows || [],
  privateConversations: state.privateConversations || []
}))
@PureRender
export default class SideBar extends React.Component {
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
