import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { FlexContainer, FlexItem } from '../Flex.jsx';
import OnlineStatus from '../components/OnlineStatus.jsx';
import RoomList from '../components/RoomList.jsx';
import Button from '../components/Button.react';
import theme from '../theme';


const styles = {
  container: {
    height: '100%',
    color: theme.sidebar.text,

    background: theme.sidebar.background
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
        <FlexContainer direction='column'>
          <FlexItem height='2.625em'>
            <Button>Lobby</Button>
          </FlexItem>

          <FlexItem scrollY>
            <h3 className="list-title">Flows</h3>
            <RoomList dispatch={dispatch} currentRoom={currentRoom} rooms={flows} />

            <h3 className="list-title">1&ndash;to&ndash;1s</h3>
            <RoomList dispatch={dispatch} currentRoom={currentRoom} rooms={privateConversations} />
          </FlexItem>

          <FlexItem height='3.750em'>
            <OnlineStatus />
          </FlexItem>
        </FlexContainer>
      </div>
    );
  }
}
