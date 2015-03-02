'use strict';

import React from 'react';

import SideBar from './SideBar.react';

class Main extends React.Component {
  render() {
    return (
      <main className="container">
        <SideBar />
      </main>
    );
  }
}

export default Main;
