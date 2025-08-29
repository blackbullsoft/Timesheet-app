export const fetchEventList = (startDate, endDate,myshedule,userId) => ({
    type: 'FETCH_EVENT_LIST_REQUEST',
    payload: {startDate, endDate,myshedule,userId },
  });
export const successFetchEvent = (events) => ({
    type: 'FETCH_EVENT_LIST_SUCCESS',
    payload: {events},
  });
export const failedFetchEvent = () => ({
    type: 'FETCH_EVENT_LIST_FAILED',
  });