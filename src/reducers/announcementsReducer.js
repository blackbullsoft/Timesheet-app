const initialState = {
  announcements: [],
  loading: false,
  error: null,
  announcedUser: [],
  annocementCreated: null,
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

    // Create Announcement
    case 'CREATE_ANNOUNCEMENT_REQUEST':
      return {...state, loading: true};
    case 'CREATE_ANNOUNCEMENT_SUCCESS':
      return {...state, annocementCreated: action.payload, loading: false};
    case 'CREATE_ANNOUNCEMENT_FAILED':
      return {...state, error: action.payload, loading: false};

    case 'CLEAR_ANNOUNCEMENT_MESSAGE':
      return {...state, annocementCreated: null, loading: false};

    default:
      return state;
  }
};

export default announcementsReducer;
