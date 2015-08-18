import React from 'react';
import PureRender from 'react-purerender';

import { FlexContainer, FlexItem } from '../Flex.jsx';
import SideBarContainer from './SideBarContainer.jsx';
import ChatContainer from './ChatContainer.jsx';
// import ChatContextContainer from './ChatContextContainer.jsx';

@PureRender
export default class Main extends React.Component {
  render() : Component {
    const chatContextWidths = {
      '*': '3.125em',
      '@media (min-width: 49em)': '5.625em',
      '@media (min-width: 60em)': '13.125em'
    };

    return (
      <FlexContainer direction='row'>
        <FlexItem width='13.125em'>
          <SideBarContainer />
        </FlexItem>

        <FlexItem>
          <ChatContainer />
        </FlexItem>

        <FlexItem width={chatContextWidths}>

        </FlexItem>
      </FlexContainer>
    );
  }
}
// <ChatContextContainer />
