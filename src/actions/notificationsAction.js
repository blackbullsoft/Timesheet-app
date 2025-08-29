export const fetchNotifications = (userId) => ({
    type: 'FETCH_NOTIFICATIONS_REQUEST',
    payload:{userId}
  });
export const successFetchNotifications = (data) => ({
    type: 'FETCH_NOTIFICATIONS_SUCCESS',
    payload: {data},
  });
export const failedFetchNotifications = () => ({
    type: 'FETCH_NOTIFICATIONS_FAILED',
  });