import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import API_BASE_URL from '../config';
import {getToken, removeToken, storeToken} from '../utils/storage';

function* feedbackPostSaga(action) {
  console.log('feedbackPostSaga', action.payload);
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
    const payloadData = {
      rating: action.payload.totalStart,
      // feedback: action.payload.feedback,
      message: action.payload.feedback,
    };
    console.log('payloadData', payloadData);
    const response = yield call(
      axios.post,
      `${API_BASE_URL}/rating/feedback-insert`,
      payloadData,
      config,
    );
    const data = response?.data || [];

    console.log('responseresponse', response);
    yield put({type: 'SEND_FEEDBACK_SUCCESS', payload: data});
  } catch (error) {
    console.log('Error ', error);
    yield put({
      type: 'SEND_FEEDBACK_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}
export default function* feedbackSaga() {
  yield takeLatest('SEND_FEEDBACK_REQUEST', feedbackPostSaga);
}
