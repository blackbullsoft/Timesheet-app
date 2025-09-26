export const fetchUserSettingRequest = fmcToken => ({
  type: 'FETCH_USER_SETTING_REQUEST',
  payload: {fmcToken},
});
export const updateUserSettingRequest = (data, fcmToken) => ({
  type: 'USER_SETTING_UPDATE_REQUEST',
  payload: {data, fcmToken},
});

export const clearUpdateSettingResponse = () => ({
  type: 'CLEAR_USER_SETTING_RESPONSE',
});
