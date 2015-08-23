
export function loadPrivateMessagesAsync(userId) {
  return (dispatch, getState) => {
    dispatch({ type: LOAD_MESSAGES_STARTED });

    var privateConversation = getState().privateConversations
      .filter(pc => pc.id === flowName)[0];

    return Flowdock.privateConversations(userId).messages.list()
      .then(
        (result) => dispatch({
          type: LOAD_PRIVATE_MESSAGES_COMPLETED,
          payload: { flow: flow.id, messages: result }
        }),
        (error) => dispatch({
          type: LOAD_MESSAGES_FAILED,
          payload: error
        }));
  };
}
