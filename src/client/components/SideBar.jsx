import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import OnlineStatus from '../components/OnlineStatus.jsx';
import RoomList from '../components/RoomList.jsx';
import Button from '../components/Button.react';
import theme from '../theme';


const styles = {
  container: {
    height: '100%',
    color: theme.sidebar.text,

    background: theme.sidebar.background
  },

  channels: {
    position: 'absolute',
    top: '2.625em',
    right: 0,
    bottom: '3.750em',
    left: 0
  }
};

export default class SideBar extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  static propTypes = {
    currentRoom: PropTypes.string,
    flows: PropTypes.array.isRequired,
    privateConversations: PropTypes.array.isRequired
  }

  render() {
    const {
      currentRoom,
      flows,
      privateConversations,
      dispatch
    } = this.props;

    return (
      <div style={styles.container}>
        <Button>Lobby</Button>

        <div style={styles.channels} className="u-scroller">
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
