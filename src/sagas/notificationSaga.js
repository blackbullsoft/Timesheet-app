import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import API_BASE_URL from '../config';
import { getToken, removeToken, storeToken } from '../utils/storage'; 

function* fetchNotificationSaga(action) {
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
    const response = yield call(axios.get, `${API_BASE_URL}/user/profile/view`, config)
    const data = response?.data || []; 
    console.log("profile data",data)
    yield put({ type: 'FETCH_NOTIFICATION_SUCCESS', payload: data });

  } catch (error) {
    yield put({ 
      type: 'FETCH_NOTIFICATION_FAILED', 
      payload:  error?.response?.data?.error || "Something went wrong!" 
    });
  }
}
export default function* notificationSaga() {
  yield takeLatest('FETCH_NOTIFICATION_REQUEST', fetchNotificationSaga);
}