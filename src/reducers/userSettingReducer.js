const initialState = {
  userSettingList: null,
  loading: false,
  error: null,
  userSettingUpdate: null,
};

const userSettingReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get user Setting
    case 'FETCH_USER_SETTING_REQUEST':
      return {...state, loading: true};
    case 'FETCH_USER_SETTING_SUCCESS':
      return {...state, userSettingList: action.payload, loading: false};
    case 'FETCH_USER_SETTING_FAILED':
      return {...state, error: action.payload, loading: false};

    // Update user setting
    case 'USER_SETTING_UPDATE_REQUEST':
      return {...state, loading: true};
    case 'USER_SETTING_UPDATE_SUCCESS':
      return {...state, userSettingList: action.payload, loading: false};
    case 'USER_SETTING_UPDATE_FAILED':
      return {...state, error: action.payload, loading: false};

    default:
      return state;
  }
};
export default userSettingReducer;
