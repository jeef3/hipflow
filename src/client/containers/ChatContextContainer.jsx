import { connect } from 'react-redux';

import ChatContext from '../components/ChatContext.jsx';

function mapStateToProps({ flows, privates, currentRoomId }) {
  const room =
    flows.filter(f => f.parameterized_name === currentRoomId)[0] ||
    privates.filter(pc => pc.id === currentRoomId)[0] ||
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
