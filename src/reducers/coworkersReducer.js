const initialState = {
    coworkers: [], 
    loading: false,
    error: null,
  };
  
  const coworkersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_COWORKERS_LIST_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_COWORKERS_LIST_SUCCESS':
        return { ...state, coworkers: action.payload, loading: false };
        
      case 'FETCH_COWORKERS_LIST_FAILED':
        return { ...state, error: action.payload, loading: false };     
      default:
        return state;
    }
  };
  
  export default coworkersReducer;