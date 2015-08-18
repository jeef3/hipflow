import { connect } from 'react-redux';

import Chat from '../components/Chat.jsx';

function mapStateToProps(state) {
  const room = state.flows.filter(f => f.parameterized_name === state.currentRoom)[0] ||
    state.privateConversations.filter(pc => pc.id === state.currentRoom)[0] ||
    {};

  return {
    room,
    messages: state.messages[room.parameterized_name || room.id] || []
  };
}

export default connect(mapStateToProps)(Chat);
