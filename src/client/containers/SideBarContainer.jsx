import { connect } from 'react-redux';

import SideBar from '../components/SideBar.jsx';
import { closeRoom } from '../actions/RoomActions';
import { showRoomAndLoadMessagesAsync } from '../actions/AggregateActions';

function mapStateToProps(state) {
  return {
    flows: state.flows.map(id => state.rooms[id]).filter(f => f.open),
    privates: state.privates.map(id => state.rooms[id]).filter(p => p.open)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onShowRoom: roomId => dispatch(showRoomAndLoadMessagesAsync(roomId)),
    onCloseRoom: roomId => dispatch(closeRoom(roomId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
