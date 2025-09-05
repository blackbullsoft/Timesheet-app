const initialState = {
  chatList: null,
  loading: false,
  error: null,
  message: null,
  sentMessage: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CHAT_REQUEST':
      return {...state, loading: true};
    case 'FETCH_CHAT_SUCCESS':
      return {...state, chatList: action.payload, loading: false};
    case 'FETCH_CHAT_FAILED':
      return {...state, error: action.payload, loading: false};

    //   Message List
    case 'FETCH_MESSAGE_REQUEST':
      return {...state, loading: true};
    case 'FETCH_MESSAGE_SUCCESS':
      return {...state, message: action.payload, loading: false};
    case 'FETCH_MESSAGE_FAILED':
      return {...state, error: action.payload, loading: false};

    //   Send Message
    case 'SEND_MESSAGE_REQUEST':
      return {...state, loading: true}; // when request starts
    case 'SEND_MESSAGE_SUCCESS':
      return {...state, sentMessage: action.payload, loading: false}; // success
    case 'SEND_MESSAGE_FAILED':
      return {...state, error: action.payload, loading: false}; // failure

    case 'CLEAR_SENT_MESSAGE':
      return {...state, sentMessage: null};
    default:
      return state;
  }
};
export default chatReducer;
