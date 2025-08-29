const initialState = {
  user: null,
  loading: false,
  error: null,
  email: null,
  reset: null,
  forgotPasswordSuccess: false,
  social: null,
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
      return {...state, email: action.payload, loading: false}; // success
    case 'USER_FORGOT_PASSWORD_EMAIL_FAILURE':
      return {...state, error: action.payload, loading: false}; // failure

    case 'USER_RESET_PASSWORD':
      return {...state, loading: true}; // when request starts
    case 'USER_RESET_PASSWORD_SUCCESS':
      return {...state, reset: action.payload, loading: false}; // success
    case 'USER_RESET_PASSWORD_FAILURE':
      return {...state, error: action.payload, loading: false}; // failure

    case 'USER_SOCIAL_LOGIN_REQUEST':
      return {...state, loading: true}; // when request starts
    case 'USER_SOCIAL_LOGIN_REQUEST_SUCCESS':
      return {...state, social: action.payload, loading: false}; // success
    case 'USER_SOCIAL_LOGIN_REQUEST_FAILURE':
      return {...state, error: action.payload, loading: false}; // failure

    case 'USER_LOGOUT':
      return {...state, user: null};

    case 'CLEAR_EMAIL':
      return {...state, email: null};
    default:
      return state;
  }
};
export default authReducer;
