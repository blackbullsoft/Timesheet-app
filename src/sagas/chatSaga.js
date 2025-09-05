import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {getToken, removeToken, storeToken} from '../utils/storage';
import {Platform} from 'react-native';

const API_BASE_URL = 'http://174.138.57.202:8000';

function* chatList() {
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
      `${API_BASE_URL}/chat/conversations`,
      config,
    );
    const data = response?.data || [];
    console.log('fetch convertation', data, token);
    yield put({type: 'FETCH_CHAT_SUCCESS', payload: data});
  } catch (error) {
    console.log(error);
    yield put({
      type: 'FETCH_CHAT_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}
function* Messages(action) {
  console.log('action.payload.conversationId', action.payload.conversationId);
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
      `${API_BASE_URL}/chat/conversations/messages/${action.payload.conversationId}`,
      config,
    );
    const data = response?.data || [];
    console.log('Fetch message', data);
    yield put({type: 'FETCH_MESSAGE_SUCCESS', payload: data});
  } catch (error) {
    console.log(error);
    yield put({
      type: 'FETCH_MESSAGE_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}

function* sendMessage(action) {
  console.log('action.payload', action.payload.messagBody);
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

    // const response = yield call(
    //   axios.post,
    //   `${API_BASE_URL}/chat/conversations/messages`,
    //   config,
    // );

    const response = yield call(
      axios.post,
      `${API_BASE_URL}/chat/conversations/messages`,
      {
        conversation_id: action.payload.messagBody.conversation_id,
        sender_id: action.payload.messagBody.sender_id,
        message: action.payload.messagBody.message,
      },
      config,
    );
    const data = response?.data || [];
    console.log('Send Message', data);
    yield put({type: 'SEND_MESSAGE_SUCCESS', payload: data});
  } catch (error) {
    console.log(error);
    yield put({
      type: 'SEND_MESSAGE_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}

export default function* chatSaga() {
  yield takeLatest('FETCH_CHAT_REQUEST', chatList);
  yield takeLatest('FETCH_MESSAGE_REQUEST', Messages);
  yield takeLatest('SEND_MESSAGE_REQUEST', sendMessage);
}
