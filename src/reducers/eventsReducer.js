const initialState = {
    events: [], 
    loading: false,
    error: null,
    totalHours:0
  };
  
  const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_EVENT_LIST_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_EVENT_LIST_SUCCESS':
        return { ...state, events: action.payload.data,totalHours:action.payload.totalHours, loading: false };
        
      case 'FETCH_EVENT_LIST_FAILED':
        return { ...state, error: action.payload, loading: false };     
      default:
        return state;
    }
  };
  
  export default eventsReducer;