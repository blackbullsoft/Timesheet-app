import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import API_BASE_URL from '../config';
import { getToken, removeToken, storeToken } from '../utils/storage'; 

function* fetchShiftSaga(action) {
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
    const timesheetId=action.payload.timesheetId
    const response = yield call(axios.get, `${API_BASE_URL}/timesheet/log/${timesheetId}`, config)
    const data = response?.data[0] || null; 
    yield put({ type: 'FETCH_SHIFT_SUCCESS', payload: data });

  } catch (error) {
    yield put({ 
      type: 'FETCH_SHIFT_FAILED', 
      payload:  error?.response?.data?.error || "Something went wrong!" 
    });
  }
}
export default function* shiftSaga() {
  yield takeLatest('FETCH_SHIFT_REQUEST', fetchShiftSaga);
}