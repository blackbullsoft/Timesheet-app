const initialState = {
  announcements: [],
  loading: false,
  error: null,
  announcedUser: [],
};

const announcementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ANNOUNCEMENTS_LIST_REQUEST':
      return {...state, loading: true};
    case 'FETCH_ANNOUNCEMENTS_LIST_SUCCESS':
      return {...state, announcements: action.payload, loading: false};

    case 'FETCH_ANNOUNCEMENTS_LIST_FAILED':
      return {...state, error: action.payload, loading: false};

    // Announced user
    case 'FETCH_ANNOUNCED_USER_REQUEST':
      return {...state};
    case 'FETCH_ANNOUNCED_USER_SUCCESS':
      return {...state, announcedUser: action.payload, loading: false};

    case 'FETCH_ANNOUNCED_USER_FAILED':
      return {...state, error: action.payload, loading: false};

    default:
      return state;
  }
};

export default announcementsReducer;
