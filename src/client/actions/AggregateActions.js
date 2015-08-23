import { loadUsersAsync } from './UserActions';
import { loadMessagesAsync } from './MessageActions';
import { loadPrivateMessagesAsync } from './PrivateMessageActions';
import {
  showFlow,
  loadFlowsAsync,
  loadPrivateConversationsAsync
} from './FlowActions';

/*
 * Initial minimal data loading
 */
export function initializeAsync() {
  return (dispatch) => {
    return Promise.all([
      dispatch(loadUsersAsync()),
      dispatch(loadFlowsAsync()),
      dispatch(loadPrivateConversationsAsync())
    ]);
  };
}

export function showFlowAndLoadMessagesAsync(id) {
  return (dispatch, getState) => {
    const { flows } = getState();
    const flow = flows.filter(f => f.id === id)[0];

    dispatch(showFlow(flow.id));

    return dispatch(loadMessagesAsync(
      flow.organization.parameterized_name,
      flow.parameterized_name));
  };
}

export function showPrivateConversationAndLoadMessagesAsync(id) {
  return (dispatch, getState) => {
    const { privateConversations } = getState();
    const privateConversation = privateConversations.filter(pc => pc.id === id)[0];

    dispatch(showFlow(privateConversation.id));

    return dispatch(loadPrivateMessagesAsync(
      privateConversation.id));
  };
}

