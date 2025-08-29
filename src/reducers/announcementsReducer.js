const initialState = {
    announcements: [], 
    loading: false,
    error: null,
  };
  
  const announcementsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_ANNOUNCEMENTS_LIST_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_ANNOUNCEMENTS_LIST_SUCCESS':
        return { ...state, announcements: action.payload, loading: false };
        
      case 'FETCH_ANNOUNCEMENTS_LIST_FAILED':
        return { ...state, error: action.payload, loading: false };     
      default:
        return state;
    }
  };
  
  export default announcementsReducer;