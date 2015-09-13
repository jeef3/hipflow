import { connect } from 'react-redux';

import SideBar from '../components/SideBar.jsx';
import { closeRoom } from '../actions/RoomActions';
import { showRoomAndLoadMessagesAsync } from '../actions/AggregateActions';

function mapStateToProps({ flows, privates, rooms }) {
  return {
    flows: flows
      .map(id => rooms[id])
      .filter(f => f.open),

    privates: privates
      .map(id => rooms[id])
      .filter(p => p.open)
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
