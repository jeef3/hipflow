import { connect } from 'react-redux';

import '../styles/main.css';
import Page from '../components/Page.jsx';

function mapStateToProps({ rooms, currentRoomId }) {
  return {
    room: rooms[currentRoomId]
  };
}

export default connect(mapStateToProps)(Page);
