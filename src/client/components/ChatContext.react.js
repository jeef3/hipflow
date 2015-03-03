'use strict';

import React from 'react';

import MessageWindowStore from '../stores/MessageWindowStore';
import RoomStore from '../stores/RoomStore';

function getState() {
  var currentRoomId = MessageWindowStore.getCurrentRoomId();

  return {
    currentRoom: RoomStore.get(currentRoomId),

    threads: [],
    sources: []
  };
}

class ChatContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = getState();

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    MessageWindowStore.on('change', this._onChange);
  }

  componentWillUnmount() {
    MessageWindowStore.off('change', this,_onChange);
  }

  render() {
    return (
      <aside class="chat-context">
        <div ng-if="currentRoom.access_mode">
          <ul class="users">
            <li class="user avatar"
                ng-repeat="user in currentRoom.users | filter:{in_flow: true} | orderBy:'-last_activity'"
                title="{{user.name}}"
                style="background-image:url({{user.avatar}}60)"
                ng-class="{'user-online': isOnline(user.id),
                           'user-offline': !isOnline(user.id)}">
            </li>
          </ul>

          <h3 class="list-title">Threads</h3>
          <ul class="thread-list">
            <li class="thread-list__item"
                ng-repeat="thread in threads | orderBy:'-lastUpdate'"
                ng-class="{'thread-muted': thread.muted}">
              <i class="fa fa-fw"
                  ng-click="thread.muted = !thread.muted"
                  ng-class="{'fa-volume-up': !thread.muted,
                             'fa-volume-off': thread.muted}"></i>
              <span title="{{thread.title}}"
                  ng-bind-html="thread.title | emoji"></span>
            </li>
          </ul>

          <h3 class="list-title">Sources</h3>
          <ul class="thread-list">
            <li class="thread-list__item"
                ng-repeat="source in sources"
                ng-class="source--{{source.type}}">{{source.id}}</li>
          </ul>
        </div>

        <div ng-if="!currentRoom.access_mode">
          <div class="user avatar avatar--large"
              title="{{currentRoom.users[1].name}}"
              style="background-image:url({{currentRoom.users[1].avatar}}316)">

          </div>
        </div>
      </aside>
    )
  }

  _onChange() {
    this.setState(getState());
  }
}

export default ChatContext;
