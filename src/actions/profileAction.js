export const fetchProfile = userId => ({
  type: 'FETCH_PROFILE_REQUEST',
  payload: {userId},
});
export const successFetchProfile = data => ({
  type: 'FETCH_PROFILE_SUCCESS',
  payload: {data},
});
export const failedFetchProfile = () => ({
  type: 'FETCH_PROFILE_FAILED',
});

export const EditProfileSaga = (data, image) => ({
  type: 'EDIT_PROFILE_REQUEST',
  payload: {data, image},
});
