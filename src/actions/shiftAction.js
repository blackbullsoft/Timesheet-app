export const fetchShift = (timesheetId) => ({
    type: 'FETCH_SHIFT_REQUEST',
    payload:{timesheetId}
  });
export const successShift = (data) => ({
    type: 'FETCH_SHIFT_SUCCESS',
    payload: {data},
  });
export const failedShift = () => ({
    type: 'FETCH_SHIFT_FAILED',
  });