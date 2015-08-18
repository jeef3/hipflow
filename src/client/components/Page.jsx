import React, { Component } from 'react';
import PureRender from 'react-purerender';

import { FlexContainer, FlexItem } from '../Flex.jsx';
import SideBarContainer from './SideBarContainer.jsx';
import ChatContainer from './ChatContainer.jsx';
// import ChatContextContainer from './ChatContextContainer.jsx';

@PureRender
export default class Page extends Component {
  static propTypes = {
    room: PropTypes.object.isRequired
  }

  render() : Component {
    const { room } = this.props;
    const chatContextWidths = {
      '*': '3.125em',
      '@media (min-width: 49em)': '5.625em',
      '@media (min-width: 60em)': '13.125em'
    };

    return (
      <FlexContainer direction='row'>
        <FlexItem width='13.125em'>
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
