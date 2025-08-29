const initialState = {
    type: '', 
    text1: '',
    text2: '',
    visible: false,
  };
  
  export default function toastReducer(state = initialState, action) {
    switch (action.type) {
      case 'SHOW_TOAST':
        return { 
          ...state, 
          type: action.payload.type, 
          text1: action.payload.text1, 
          text2: action.payload.text2,
          visible: true
        };
      case 'HIDE_TOAST':
        return { ...state, visible: false };
      default:
        return state;
    }
  }
  