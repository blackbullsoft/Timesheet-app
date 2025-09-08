export const newsFeedList = () => ({
  type: 'FETCH_FEED_REQUEST',
  //   payload: {email, password, fcmToken},
});

export const likeAndDislike = newsFeedId => ({
  type: 'LIKE_FEED_REQUEST',
  payload: {newsFeedId},
});

export const addComment = (content, feedId) => ({
  type: 'COMMENT_FEED_REQUEST',
  payload: {content, feedId},
});

export const fetchComment = feedId => ({
  type: 'FETCH_COMMENT_REQUEST',
  payload: {feedId},
});

// export const sendMessage = messagBody => ({
//   type: 'SEND_MESSAGE_REQUEST',
//   payload: {messagBody},
//   //   payload: {email, password, fcmToken},
// });
