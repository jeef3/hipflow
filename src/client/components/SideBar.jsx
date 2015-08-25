import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { FlexContainer, FlexItem } from './layout/Flex.jsx';
import Scroller from './layout/Scroller.jsx';
import OnlineStatus from './OnlineStatus.jsx';
import RoomList from './RoomList.jsx';
import Button from './Button.jsx';
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
    room: PropTypes.object.isRequired,
    flows: PropTypes.array.isRequired,
    privates: PropTypes.array.isRequired,

    onShowRoom: PropTypes.func.isRequired,
    onCloseRoom: PropTypes.func.isRequired,
  }

  render() : Component {
    const {
      room,
      flows,
      privates,
      onShowRoom,
      onCloseRoom
    } = this.props;

    return (
      <div style={ styles.container }>
        <FlexContainer direction='column'>
          <FlexItem height={42}>
            <Button>Lobby</Button>
          </FlexItem>

          <FlexItem>
            <Scroller vertical>
              <h3 className='list-title'>Flows</h3>
              <RoomList
                  currentRoomId={room.id}
                  rooms={flows}
                  onShowRoom={onShowRoom}
                  onCloseRoom={onCloseRoom} />

              <h3 className='list-title'>1&ndash;to&ndash;1s</h3>
              <RoomList
                currentRoomId={room.id}
                rooms={privates}
                onShowRoom={onShowRoom}
                onCloseRoom={onCloseRoom} />
            </Scroller>
          </FlexItem>

          <FlexItem height={60}>
            <OnlineStatus />
          </FlexItem>
        </FlexContainer>
      </div>
    );
  }
}
