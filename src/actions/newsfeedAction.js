export const newsFeedList = (page, limit) => ({
  type: 'FETCH_FEED_REQUEST',
  payload: {page, limit},
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

export const AddFeed = newsFeedText => ({
  type: 'ADD_NEWSFEED_REQUEST',
  payload: {newsFeedText},
});

export const clearNewsFeedResponse = () => ({type: 'CLEAR_NEWSFEED_RESPONSE'});
export const clearCommeent = () => ({type: 'CLEAR_COMMENT_RESPONSE'});

// export const sendMessage = messagBody => ({
//   type: 'SEND_MESSAGE_REQUEST',
//   payload: {messagBody},
//   //   payload: {email, password, fcmToken},
// });
