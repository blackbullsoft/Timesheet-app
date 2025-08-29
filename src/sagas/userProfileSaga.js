import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import API_BASE_URL from '../config';
import { getToken, removeToken, storeToken } from '../utils/storage'; 

function* fetchUserProfileSaga(action) {
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
    const employeeId=action?.payload?.employeeId 
    const response = yield call(axios.get, `${API_BASE_URL}/user/profile/view/${employeeId}`, config)
    const data = response?.data || []; 
    console.log(" USer profile data",data)
    yield put({ type: 'FETCH_USER_PROFILE_SUCCESS', payload: data });

  } catch (error) {
    yield put({ 
      type: 'FETCH_USER_PROFILE_FAILED', 
      payload:  error?.response?.data?.error || "Something went wrong!" 
    });
  }
}
export default function* userProfileSaga() {
  yield takeLatest('FETCH_USER_PROFILE_REQUEST', fetchUserProfileSaga);
}