const initialState = {
    data: [], 
    loading: false,
    error: null,
  };
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_NOTIFICATION_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_NOTIFICATION_SUCCESS':
        return { ...state, data: action.payload, loading: false };
        
      case 'FETCH_NOTIFICATION_FAILED':
        return { ...state, error: action.payload, loading: false };     
      default:
        return state;
    }
  };
  
  export default notificationReducer;