export const fetchNotification = () => ({
    type: 'FETCH_NOTIFICATION_REQUEST',
  });
export const successFetchNotification = (data) => ({
    type: 'FETCH_NOTIFICATION_SUCCESS',
    payload: {data},
  });
export const failedFetchNotification = () => ({
    type: 'FETCH_NOTIFICATION_FAILED',
  });