const initialState = {
    signup: false, 
    loading: false,
    error: null,
  };
  
  const signupReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_SIGNUP_REQUEST':
        return { ...state, loading: true,signup:false };
      case 'USER_SIGNUP_SUCCESS':
        return { ...state, signup: true, loading: false };
      case 'USER_SIGNUP_FAILURE':
        return { ...state, error: action.payload, loading: false,signup:false };     
      default:
        return state;
    }
  };
  
  export default signupReducer;