const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return {...state, loading: true};
    case 'USER_LOGIN_SUCCESS':
      return {...state, user: action.payload, loading: false};
    case 'USER_LOGIN_FAILURE':
      return {...state, error: action.payload, loading: false};
    case 'USER_LOGIN_ALREADY':
      return {...state, loading: true};
    case 'USER_LOGIN_ALREADY_OPERATION_SUCCESS':
      return {...state, loading: false};
    case 'USER_FORGOT_PASSWORD_EMAIL':
      return {...state, loading: true}; // when request starts
    case 'USER_FORGOT_PASSWORD_EMAIL_SUCCESS':
      return {...state, loading: false}; // success
    case 'USER_FORGOT_PASSWORD_EMAIL_FAILURE':
      return {...state, error: action.payload, loading: false}; // failure
    case 'USER_LOGOUT':
      return {...state, user: null};
    default:
      return state;
  }
};

export default authReducer;
