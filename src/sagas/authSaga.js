import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {getToken, removeToken, storeToken} from '../utils/storage';
import {jwtDecode} from 'jwt-decode';
import {showToast} from '../actions/toastAction';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

const API_BASE_URL = 'http://174.138.57.202:8000';

function* loginUserSaga(action) {
  try {
    const response = yield call(axios.post, `${API_BASE_URL}/admin/login`, {
      email: action.payload.email,
      password: action.payload.password,
    });

    const token = response.data.token;
    const data = jwtDecode(token);

    yield call(storeToken, token);
    yield put({type: 'USER_LOGIN_SUCCESS', payload: data});

    const userAgent = yield call(DeviceInfo.getUserAgent);
    const deviceType =
      Platform.OS === 'android' ? 1 : Platform.OS === 'ios' ? 2 : 3;

    const fcmResponse = yield call(
      axios.get,
      `${API_BASE_URL}/user/fcm?userId=${data?.userId}`,
    );
    const existingFcmTokens = fcmResponse.data || [];

    const isFcmTokenExists = existingFcmTokens.some(
      item => item.fcm_token === action.payload.fcmToken,
    );

    if (!isFcmTokenExists) {
      yield call(axios.post, `${API_BASE_URL}/user/fcm`, {
        userId: data?.userId,
        fcmToken: action.payload.fcmToken,
        userAgent,
        deviceType,
      });
    }

    yield put(showToast('success', 'Login Successful', 'Welcome back!'));
  } catch (error) {
    yield put({
      type: 'USER_LOGIN_FAILURE',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });

    yield put(
      showToast(
        'error',
        'Login Failed',
        error?.response?.data?.error || 'Something went wrong!',
      ),
    );
  }
}

function* signUpUserSaga(action) {
  try {
    yield call(axios.post, `${API_BASE_URL}/user/v2/register`, {
      username: action.payload.username,
      email: action.payload.email,
      mobile: action.payload.mobile,
      password: action.payload.password,
      role: 2,
      qualifications: [],
      skills: [],
      languages: [],
    });
    yield put({type: 'USER_SIGNUP_SUCCESS', payload: true});
    yield put(
      showToast(
        'success',
        'Sign Up Successful',
        'Account created successfully!',
      ),
    );
  } catch (error) {
    yield put({
      type: 'USER_SIGNUP_FAILURE',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
    yield put(
      showToast(
        'error',
        'Sign Up Failed',
        error?.response?.data?.error || 'Something went wrong!',
      ),
    );
  }
}

function* logOutUserSaga() {
  try {
    yield call(removeToken);
    yield put({type: 'USER_LOGOUT_SUCCESS'});

    yield put(
      showToast(
        'success',
        'Logged Out',
        'You have been logged out successfully!',
      ),
    );
  } catch (error) {
    yield put({type: 'USER_LOGOUT_FAILURE', payload: error.message});

    yield put(
      showToast(
        'error',
        'Logout Failed',
        error?.response?.data?.error || 'Something went wrong!',
      ),
    );
  }
}

function* checkAutoLogin() {
  try {
    const token = yield call(getToken);

    if (!token) {
      throw new Error('No authentication token found');
    }

    const data = jwtDecode(token);
    yield put({type: 'USER_LOGIN_SUCCESS', payload: data});
  } catch (error) {
    yield put({type: 'USER_LOGIN_ALREADY_OPERATION_SUCCESS'});

    yield put(showToast('error', 'Session Expired', 'Please log in again.'));
  }
}

function* fogotPasswordEmailSendUserSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_BASE_URL}/user/request-password-reset`,
      {email: action.payload.email},
    );

    console.log('Forgot password response:', response);

    // ✅ Dispatch SUCCESS (different type!)
    yield put({type: 'USER_FORGOT_PASSWORD_EMAIL_SUCCESS', payload: true});

    yield put(
      showToast(
        'success',
        'Email Sent',
        'Password reset link sent to your email.',
      ),
    );
  } catch (error) {
    yield put({
      type: 'USER_FORGOT_PASSWORD_EMAIL_FAILURE',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });

    yield put(
      showToast(
        'error',
        'Reset Failed',
        error?.response?.data?.error || 'Something went wrong!',
      ),
    );
  }
}

export default function* authSaga() {
  yield takeLatest('USER_SIGNUP_REQUEST', signUpUserSaga);
  yield takeLatest('USER_LOGIN_REQUEST', loginUserSaga);
  yield takeLatest('USER_LOGOUT', logOutUserSaga);
  yield takeLatest('USER_LOGIN_ALREADY', checkAutoLogin);
  yield takeLatest(
    'USER_FORGOT_PASSWORD_EMAIL',
    fogotPasswordEmailSendUserSaga,
  );
}
