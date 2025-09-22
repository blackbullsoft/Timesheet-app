import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {getToken} from '../utils/storage';
import {showToast} from '../actions/toastAction';

const API_BASE_URL = 'http://174.138.57.202:8000';

function* fetchUserSettingSaga() {
  console.log('User setting');

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
      `${API_BASE_URL}/user-settings`,
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
  console.log('User setting');

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
      axios.put,
      `${API_BASE_URL}/user-settings`,

      {
        conversation_id: action.payload.messagBody.conversation_id,
        sender_id: action.payload.messagBody.sender_id,
        message: action.payload.messagBody.message,
      },
      config,
    );
    const data = response?.data || [];
    console.log('USer settting', data, token);
    yield put({type: 'USER_SETTING_UPDATE_SUCCESS', payload: data});
  } catch (error) {
    console.warn('user setting', error);
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
