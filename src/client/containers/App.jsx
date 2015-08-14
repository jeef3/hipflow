import React from 'react';

import Layout from '../Layout.jsx';
import SideBarContainer from './SideBarContainer.jsx';
// import Chat from './Chat.jsx';
import ChatContextContainer from './ChatContextContainer.jsx';

export default class Main extends React.Component {
  render() : Component {
    return (
      <main className="container">
        <Layout item='sidebar'>
          <SideBarContainer />
        </Layout>
      </main>
    );
  }
}
        // <ChatContextContainer />
// <Chat room={room} />
