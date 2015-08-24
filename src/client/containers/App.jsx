import { connect } from 'react-redux';

import '../styles/main.css';
import Page from '../components/Page.jsx';

function mapStateToProps(state) {
  return {
    room: state.rooms[state.currentRoomId]
  };
}

export default connect(mapStateToProps)(Page);
