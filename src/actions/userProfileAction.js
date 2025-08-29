export const fetchUserProfile = (employeeId) => ({
    type: 'FETCH_USER_PROFILE_REQUEST',
    payload:{employeeId}
  });
export const successFetchUserProfile = (data) => ({
    type: 'FETCH_USER_PROFILE_SUCCESS',
    payload: {data},
  });
export const failedFetchUserProfile = () => ({
    type: 'FETCH_USER_PROFILE_FAILED',
  });