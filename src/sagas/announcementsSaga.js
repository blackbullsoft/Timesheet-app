import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import API_BASE_URL from '../config';
import { getToken, removeToken, storeToken } from '../utils/storage'; 

function* fetchAnnouncementsSaga(action) {
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
    const response = yield call(axios.get, `${API_BASE_URL}/events/view`, config)
    const announcements = response?.data || []; 
    yield put({ type: 'FETCH_ANNOUNCEMENTS_LIST_SUCCESS', payload: announcements });

  } catch (error) {
    yield put({ 
      type: 'FETCH_ANNOUNCEMENTS_LIST_FAILED', 
      payload:  error?.response?.data?.error || "Something went wrong!" 
    });
  }
}
export default function* announcementsSaga() {
  yield takeLatest('FETCH_ANNOUNCEMENTS_LIST_REQUEST', fetchAnnouncementsSaga);
}