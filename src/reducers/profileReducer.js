const initialState = {
    data: [], 
    loading: false,
    error: null,
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PROFILE_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_PROFILE_SUCCESS':
        return { ...state, data: action.payload, loading: false };
        
      case 'FETCH_PROFILE_FAILED':
        return { ...state, error: action.payload, loading: false };     
      default:
        return state;
    }
  };
  
  export default profileReducer;