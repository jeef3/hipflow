import { connect } from 'react-redux';

import SideBar from '../components/SideBar.jsx';

function mapStateToProps(state) {
  return {
    flows: state.flows.filter(f => f.open),
    privateConversations: state.privateConversations.filter(pc => pc.open)
  };
}

export default connect(mapStateToProps)(SideBar);
