export const fetchUserSettingRequest = () => ({
  type: 'FETCH_USER_SETTING_REQUEST',
});
export const updateUserSettingRequest = data => ({
  type: 'USER_SETTING_UPDATE_REQUEST',
  payload: {data},
});
