import { connect } from 'react-redux';

import ChatContext from '../components/ChatContext.jsx';

function mapStateToProps(state) {
  const users = state.currentRoom && state.currentRoom.access_mode ?
    state.currentRoom.getJoinedUsers()
      .sort((a, b) => {
        return b.last_activity - a.last_activity;
      }) : null;

  return {
    currentRoom: state.currentRoom,
    users
  };
}

export default connect(mapStateToProps)(ChatContext);
