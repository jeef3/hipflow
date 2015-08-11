import React from 'react';

import SideBar from './SideBar.jsx';
// import Chat from './Chat.jsx';
import ChatContext from './ChatContext.jsx';

export default class Main extends React.Component {
  render() : Component {
    return (
      <main className="container">
        <SideBar />
        <ChatContext />
      </main>
    );
  }
}
// <Chat room={room} />
