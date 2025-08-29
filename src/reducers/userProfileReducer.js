const initialState = {
    data: [], 
    loading: false,
    error: null,
  };
  
  const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USER_PROFILE_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_USER_PROFILE_SUCCESS':
        return { ...state, data: action.payload, loading: false };
        
      case 'FETCH_USER_PROFILE_FAILED':
        return { ...state, error: action.payload, loading: false };     
      default:
        return state;
    }
  };
  
  export default userProfileReducer;