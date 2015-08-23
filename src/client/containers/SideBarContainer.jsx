import { connect } from 'react-redux';

import SideBar from '../components/SideBar.jsx';
import { closeRoom } from '../actions/RoomActions';
import { showRoomAndLoadMessagesAsync } from '../actions/SyncActions';

function mapStateToProps(state) {
  return {
    flows: state.flows.filter(f => f.open),
    privateConversations: state.privateConversations.filter(pc => pc.open)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onShowFlow: roomId => dispatch(showRoomAndLoadMessagesAsync(roomId)),
    onCloseFlow: roomId => dispatch(closeRoom(roomId)),
    onShowPrivateConversation: roomId => dispatch(showRoomAndLoadMessagesAsync(roomId)),
    onClosePrivateConversation: roomId => dispatch(closeRoom(roomId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
