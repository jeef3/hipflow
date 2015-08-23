import React, { Component, PropTypes } from 'react';

import { FlexContainer, FlexItem } from './layout/Flex.jsx';
import Scroller from './layout/Scroller.jsx';
import TopicBar from './TopicBar.jsx';
import MessageWindow from './MessageWindow.jsx';
import ChatBar from './ChatBar.jsx';

export default class Chat extends Component {
  static propTypes = {
    room: PropTypes.object,
    messages: PropTypes.array.isRequired
  }

  render() {
    const { users, room, messages } = this.props;

    if (!room) {
      return <p>No room selected</p>;
    }

    return (
      <FlexContainer direction='column'>
        <FlexItem height={48}>
          <TopicBar name={room.name} description={room.description} />
        </FlexItem>

        <FlexItem>
          <Scroller vertical>
            <MessageWindow users={users} messages={messages} />
          </Scroller>
        </FlexItem>

        <FlexItem height={60}>
          <ChatBar room={room} />
        </FlexItem>
      </FlexContainer>
    );
  }
}
