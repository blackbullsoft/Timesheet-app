export const fetchCoworkersList = () => ({
    type: 'FETCH_COWORKERS_LIST_REQUEST',
  });
export const successFetchCoworkers = (data) => ({
    type: 'FETCH_COWORKERS_LIST_SUCCESS',
    payload: {data},
  });
export const failedFetchCoworkers = () => ({
    type: 'FETCH_COWORKERS_LIST_FAILED',
  });