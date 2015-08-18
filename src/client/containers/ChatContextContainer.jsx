import { connect } from 'react-redux';

import ChatContext from '../components/ChatContext.jsx';

function mapStateToProps(state) {
  const room =
    state.flows.filter(f => f.parameterized_name === state.currentRoomId)[0] ||
    state.privateConversations.filter(pc => pc.id === state.currentRoomId)[0] ||
    {};

  return {
    users: room.access_mode ?
      room.users
        .filter(user => user.in_flow)
        .sort((a, b) => {
          return b.last_activity - a.last_activity;
        }) : null
  };
}

export default connect(mapStateToProps)(ChatContext);
