import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import API_BASE_URL from '../config';
import { getToken, removeToken, storeToken } from '../utils/storage'; 

function* fetchCoworkersSaga(action) {
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
    const response = yield call(axios.get, `${API_BASE_URL}/user/view`, config)
    const announcements = response?.data?.users || []; 
    yield put({ type: 'FETCH_COWORKERS_LIST_SUCCESS', payload: announcements });

  } catch (error) {
    yield put({ 
      type: 'FETCH_COWORKERS_LIST_FAILED', 
      payload:  error?.response?.data?.error || "Something went wrong!" 
    });
  }
}
export default function* coworkerSaga() {
  yield takeLatest('FETCH_COWORKERS_LIST_REQUEST', fetchCoworkersSaga);
}