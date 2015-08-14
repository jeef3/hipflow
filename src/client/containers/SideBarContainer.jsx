import { connect } from 'react-redux';

import SideBar from '../components/SideBar.jsx';

function mapStateToProps(state) {
  return {
    currentRoom: state.currentRoom,

    flows: state.flows,
    privateConversations: state.privateConversations
  };
}

export default connect(mapStateToProps)(SideBar);
