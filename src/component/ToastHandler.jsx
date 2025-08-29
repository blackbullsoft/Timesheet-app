import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

const ToastHandler = () => {
  const dispatch = useDispatch();
  const toast = useSelector(state => state.toast);

  useEffect(() => {
    if (toast.visible) {
      Toast.show({
        type: toast.type,
        text1: toast.text1,
        text2: toast.text2,
      });
      dispatch({ type: 'HIDE_TOAST' });
    }
  }, [toast, dispatch]);

  return <Toast />;
};

export default ToastHandler;
