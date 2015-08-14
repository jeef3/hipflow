import React from 'react';

import SideBarContainer from './SideBarContainer.jsx';
// import Chat from './Chat.jsx';
import ChatContextContainer from './ChatContextContainer.jsx';

export default class Main extends React.Component {
  render() : Component {
    return (
      <main className="container">
        <SideBarContainer />
      </main>
    );
  }
}
        // <ChatContextContainer />
// <Chat room={room} />
