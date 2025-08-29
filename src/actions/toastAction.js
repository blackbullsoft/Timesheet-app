export const showToast = (toastType, text1, text2) => ({
    type: 'SHOW_TOAST',
    payload: { type: toastType, text1, text2 }
  });
  
  export const hideToast = () => ({
    type: 'HIDE_TOAST'
  });
  