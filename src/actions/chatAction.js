export const chatList = () => ({
  type: 'FETCH_CHAT_REQUEST',
  //   payload: {email, password, fcmToken},
});

export const Messages = conversationId => ({
  type: 'FETCH_MESSAGE_REQUEST',
  payload: {conversationId},
  //   payload: {email, password, fcmToken},
});

export const sendMessage = messagBody => ({
  type: 'SEND_MESSAGE_REQUEST',
  payload: {messagBody},
  //   payload: {email, password, fcmToken},
});

export const clearSentMessage = () => ({type: 'CLEAR_SENT_MESSAGE'});
