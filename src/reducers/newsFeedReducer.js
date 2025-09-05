const initialState = {
  loading: false,
  error: null,
  newsFeedData: null,
};

const newsFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    //   Send Message
    case 'FETCH_FEED_REQUEST':
      return {...state, loading: true}; // when request starts
    case 'FETCH_FEED_SUCCESS':
      return {...state, newsFeedData: action.payload, loading: false}; // success
    case 'FETCH_FEED_FAILED':
      return {...state, error: action.payload, loading: false}; // failure

    default:
      return state;
  }
};
export default newsFeedReducer;
