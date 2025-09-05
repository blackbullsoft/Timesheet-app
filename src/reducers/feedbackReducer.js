const initialState = {
  loading: false,
  error: null,
  feedbackData: null,
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    //   Send Message
    case 'SEND_FEEDBACK_REQUEST':
      return {...state, loading: true}; // when request starts
    case 'SEND_FEEDBACK_SUCCESS':
      return {...state, feedbackData: action.payload, loading: false}; // success
    case 'SEND_FEEDBACK_FAILED':
      return {...state, error: action.payload, loading: false}; // failure

    default:
      return state;
  }
};
export default feedbackReducer;
