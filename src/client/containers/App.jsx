import React from 'react';

import { FlexContainer, FlexItem } from '../Flex.jsx';
import SideBarContainer from './SideBarContainer.jsx';
import ChatContainer from './ChatContainer.jsx';
// import ChatContextContainer from './ChatContextContainer.jsx';

export default class Main extends React.Component {
  render() : Component {
    const chatContextWidths = {
      '*': '3.125em',
      '@media (min-width: 49em)': '5.625em',
      '@media (min-width: 60em)': '13.125em'
    };

    return (
      <main className="container">
        <FlexContainer direction='column'>
          <FlexItem width='13.125em'>
            <SideBarContainer />
          </FlexItem>

          <FlexItem>
            <ChatContainer />
          </FlexItem>

          <FlexItem width={chatContextWidths}>

          </FlexItem>
        </FlexContainer>
      </main>
    );
  }
}
// <ChatContextContainer />
