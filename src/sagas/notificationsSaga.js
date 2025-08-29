import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import API_BASE_URL from '../config';
import { getToken, removeToken, storeToken } from '../utils/storage'; 

function* fetchNotificationsSaga(action) {
  try {
    const token = yield call(getToken);
    
    if (!token) {
      throw new Error("No authentication token found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const userId=action.payload.userId
    const response = yield call(axios.get, `${API_BASE_URL}/user/push-notification/${userId}?readOnly=false`, config)
    const data = response?.data?.data || []; 
    yield put({ type: 'FETCH_NOTIFICATIONS_SUCCESS', payload: data });

  } catch (error) {
    yield put({ 
      type: 'FETCH_NOTIFICATIONS_FAILED', 
      payload:  error?.response?.data?.error || "Something went wrong!" 
    });
  }
}
export default function* notificationsSaga() {
  yield takeLatest('FETCH_NOTIFICATIONS_REQUEST', fetchNotificationsSaga);
}