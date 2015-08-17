import { connect } from 'react-redux';

import Chat from '../components/Chat.jsx';

function mapStateToProps(state) {
  return {
    room:
      state.flows.filter(f => f.id === state.currentRoom)[0] ||
      state.privateConversations.filter(pc => pc.id === state.currentRoom)[0]
  };
}

export default connect(mapStateToProps)(Chat);
