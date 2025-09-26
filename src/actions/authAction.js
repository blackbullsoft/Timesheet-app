export const loginUser = (email, password, fcmToken) => ({
  type: 'USER_LOGIN_REQUEST',
  payload: {email, password, fcmToken},
});

export const socialLogin = (googleToken, userInfo, fcmToken) => ({
  type: 'USER_SOCIAL_LOGIN_REQUEST',
  payload: {googleToken, userInfo, fcmToken},
});
export const alreadyLoginUser = () => ({
  type: 'USER_LOGIN_ALREADY',
});
export const signUpUser = (email, password, username, mobile) => ({
  type: 'USER_SIGNUP_REQUEST',
  payload: {email, password, username, mobile},
});

export const logoutUser = () => ({
  type: 'USER_LOGOUT',
});

export const forgotPasswordEmail = email => ({
  type: 'USER_FORGOT_PASSWORD_EMAIL',
  payload: {email},
});

export const resetPassword = (
  email,
  resetCode,
  newPassword,
  confirmPassword,
) => ({
  type: 'USER_RESET_PASSWORD',
  payload: {email, resetCode, newPassword, confirmPassword},
});
export const clearEmail = () => ({type: 'CLEAR_EMAIL'});
