const initialState = {
  loading: false,
  error: null,
  newsFeedData: null,
  like: null,
  comment: null,
  commentList: null,
  addnewsFeedData: null,
};

const newsFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    //   Fetch News Feed
    case 'FETCH_FEED_REQUEST':
      return {...state}; // when request starts
    case 'FETCH_FEED_SUCCESS':
      return {...state, newsFeedData: action.payload, loading: false}; // success
    case 'FETCH_FEED_FAILED':
      return {...state, error: action.payload, loading: false}; // failure

    // Like and Dislike News Feed
    case 'LIKE_FEED_REQUEST':
      return {...state}; // when request starts
    case 'LIKE_FEED_SUCCESS': {
      const {newsFeedId, isLiked} = action.payload;
      const updatedFeeds = state.newsFeedData?.feeds?.map(item =>
        item.id === newsFeedId
          ? {
              ...item,
              is_liked: isLiked,
              total_likes:
                isLiked === 1
                  ? item.total_likes + 1
                  : Math.max(item.total_likes - 1, 0),
            }
          : item,
      );
      const feeds = {feeds: updatedFeeds};
      return {
        ...state,
        newsFeedData: feeds,
        loading: false,
      };
    }

    //  Comment on News Feed
    case 'COMMENT_FEED_REQUEST':
      return {...state, loading: true}; // when request starts
    // case 'COMMENT_FEED_SUCCESS': {
    //   const {feed_id} = action.payload;
    //   console.log('feedId in reducer', feed_id, action.payload);
    //   const updateCommentList = state.commentList?.comments?.map(item =>
    //     item.feed_id === feed_id
    //       ? {...item, comments: [...item.comments, action.payload.comment]}
    //       : item,
    //   );
    //   console.log('Updated Comment List', updateCommentList);
    //   const comments = {comments: updateCommentList};
    //   console.log('Final Comment', comment);

    //   return {...state, comment: action.payload,
    //     commentList:comments,
    //     loading: false}; // success
    // }

    case 'COMMENT_FEED_SUCCESS': {
      const newComment = action.payload; // response from API
      const updatedComments = [
        ...(state.commentList?.comments || []),
        newComment,
      ];

      return {
        ...state,
        commentList: {
          ...state.commentList,
          comments: updatedComments,
        },
        loading: false,
      };
    }

    case 'COMMENT_FEED_FAILED':
      return {...state, error: action.payload, loading: false}; // failure
    // Fetch Comments for a Feed
    case 'FETCH_COMMENT_REQUEST':
      return {...state, loading: true}; // when request starts
    case 'FETCH_COMMENT_SUCCESS':
      return {...state, commentList: action.payload, loading: false};
    case 'FETCH_COMMENT_FAILED':
      return {...state, error: action.payload, loading: false}; // failure

    case 'ADD_NEWSFEED_REQUEST':
      return {...state, loading: true}; // when request starts
    case 'ADD_NEWSFEED_SUCCESS':
      return {...state, addnewsFeedData: action.payload, loading: false};
    case 'ADD_NEWSFEED_FAILED':
      return {...state, error: action.payload, loading: false}; // failure

    case 'CLEAR_NEWSFEED_RESPONSE':
      return {...state, addnewsFeedData: null};

    case 'CLEAR_COMMENT_RESPONSE':
      return {...state, commentList: null};
    default:
      return state;
  }
};
export default newsFeedReducer;
