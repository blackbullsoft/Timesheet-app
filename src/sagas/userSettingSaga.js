import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {getToken} from '../utils/storage';
import {showToast} from '../actions/toastAction';

const API_BASE_URL = 'http://174.138.57.202:8000';

function* fetchUserSettingSaga(action) {
  console.log('User setting', action.payload.fmcToken);

  try {
    const token = yield call(getToken);

    if (!token) {
      throw new Error('No authentication token found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(
      axios.get,
      `${API_BASE_URL}/user-settings?token=${action.payload.fmcToken}`,
      config,
    );
    const data = response?.data || [];
    console.log('USer settting', data, token);
    yield put({type: 'FETCH_USER_SETTING_SUCCESS', payload: data});
  } catch (error) {
    console.warn('user setting', error);
    yield put({
      type: 'FETCH_USER_SETTING_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}

function* updateUserSettingSaga(action) {
  console.log('Updateusersetting', action.payload);
  let userSettingList = action.payload.data;
  try {
    const token = yield call(getToken);

    if (!token) {
      throw new Error('No authentication token found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    console.log('userSettingList', userSettingList);
    const payloadData = {
      token: action.payload.fcmToken,
      shift_alarm_enabled: userSettingList?.shift_alarm_enabled ? 1 : 0,
      dashboard_notification: userSettingList?.dashboard_notification ? 1 : 0,
      email_dashboard_notification:
        userSettingList?.email_dashboard_notification ? 1 : 0,
      message_notification: userSettingList?.message_notification ? 1 : 0,
      email_message_notification: userSettingList?.email_message_notification
        ? 1
        : 0,
      newsfeed_notification: userSettingList?.newsfeed_notification ? 1 : 0,
      email_newsfeed_notification: userSettingList?.email_newsfeed_notification
        ? 1
        : 0,
      shift_alarm_minutes: parseInt(userSettingList?.shift_alarm_minutes),
    };

    console.log('payloadData', payloadData);
    const response = yield call(
      axios.put,
      `${API_BASE_URL}/user-settings`,

      payloadData,
      config,
    );
    const data =
      {
        response: response?.data,
        status: response.status,
      } || [];
    console.log('USer settting', response, token);
    yield put(showToast('success', 'User Setting Save Successfully'));

    yield put({type: 'USER_SETTING_UPDATE_SUCCESS', payload: data});
  } catch (error) {
    console.warn('user setting', error.response);
    yield put(showToast('error', `${error.response.data.message}`));

    yield put({
      type: 'USER_SETTING_UPDATE_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}
export default function* userSettingSaga() {
  yield takeLatest('FETCH_USER_SETTING_REQUEST', fetchUserSettingSaga);
  yield takeLatest('USER_SETTING_UPDATE_REQUEST', updateUserSettingSaga);
}
