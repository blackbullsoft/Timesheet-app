const initialState = {
    data: null, 
    loading: false,
    error: null,
  };
  
  const shiftReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_SHIFT_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SHIFT_SUCCESS':
        return { ...state, data: action.payload, loading: false };
        
      case 'FETCH_SHIFT_FAILED':
        return { ...state, error: action.payload, loading: false,data:null };     
      default:
        return state;
    }
  };
  
  export default shiftReducer;