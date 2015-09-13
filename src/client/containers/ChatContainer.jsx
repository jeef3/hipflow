import { connect } from 'react-redux';

import Chat from '../components/Chat.jsx';

function mapStateToProps({ users, messages, currentRoomId }) {
  return {
    users: users,
    messages: messages[currentRoomId] || []
  };
}

export default connect(mapStateToProps)(Chat);
