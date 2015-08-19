import React, { Component, PropTypes } from 'react';
import PureRender from 'react-purerender';

import { FlexContainer, FlexItem } from './layout/Flex.jsx';
import SideBarContainer from '../containers/SideBarContainer.jsx';
import ChatContainer from '../containers/ChatContainer.jsx';
// import ChatContextContainer from './ChatContextContainer.jsx';

@PureRender
export default class Page extends Component {
  static propTypes = {
    room: PropTypes.object
  }

  render() : Component {
    const { room } = this.props;
    const chatContextWidths = {
      '*': '3.125em',
      '@media (min-width: 49em)': '5.625em',
      '@media (min-width: 60em)': '13.125em'
    };

    if (!room) {
      return <div>Loading...</div>;
    }

    return (
      <FlexContainer direction='row'>
        <FlexItem width={210}>
          <SideBarContainer room={room} />
        </FlexItem>

        <FlexItem>
          <ChatContainer room={room} />
        </FlexItem>

        <FlexItem width={chatContextWidths}>

        </FlexItem>
      </FlexContainer>
    );
  }
}
