import { connect } from 'react-redux';

import '../styles/main.css';
import Page from '../components/Page.jsx';

function mapStateToProps(state) {
  return {
    room:
      state.flows.filter(f => f.id === state.currentRoomId)[0] ||
      state.privateConversations.filter(pc => pc.id === state.currentRoomId)[0]
  };
}

export default connect(mapStateToProps)(Page);
