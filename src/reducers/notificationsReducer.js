const initialState = {
    data: [], 
    loading: false,
    error: null,
  };
  
  const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_NOTIFICATIONS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_NOTIFICATIONS_SUCCESS':
        return { ...state, data: action.payload, loading: false };
        
      case 'FETCH_NOTIFICATIONS_FAILED':
        return { ...state, error: action.payload, loading: false,data:[] };     
      default:
        return state;
    }
  };
  
  export default notificationsReducer;