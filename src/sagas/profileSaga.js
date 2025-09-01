import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import API_BASE_URL from '../config';
import {getToken, removeToken, storeToken} from '../utils/storage';

function* fetchProfileSaga(action) {
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
    const userId = action.payload.userId;
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/user/profile/view/${userId}`,
      config,
    );
    const data = response?.data || [];
    console.log('fetchProfileSaga', data, token);
    yield put({type: 'FETCH_PROFILE_SUCCESS', payload: data});
  } catch (error) {
    console.log(error);
    yield put({
      type: 'FETCH_PROFILE_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}
export default function* profileSaga() {
  yield takeLatest('FETCH_PROFILE_REQUEST', fetchProfileSaga);
}
