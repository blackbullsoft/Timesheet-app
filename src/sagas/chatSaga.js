import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {getToken, removeToken, storeToken} from '../utils/storage';
import {Platform} from 'react-native';
import {showToast} from '../actions/toastAction';

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
    console.log('Send Message123', data, response);
    yield put({type: 'SEND_MESSAGE_SUCCESS', payload: data});
  } catch (error) {
    console.log(error);
    yield put({
      type: 'SEND_MESSAGE_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}

function* createConversations(action) {
  const {creater, list} = action.payload.data;

  console.log('action.payload', creater, list);
  const listofdata = list.map(data => data.id);
  const data = {
    type: 'private',
    participants: [Number(creater), ...listofdata],
  };

  console.log('listofdata', data, list);
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
      axios.post,
      `${API_BASE_URL}/chat/conversations`,
      {
        type: 'private',
        participants: [Number(creater), ...listofdata],
      },

      config,
    );
    const data = response?.data || [];
    console.log('Send Message', data, response);
    yield put(showToast('success', 'Conversations created'));

    yield put({type: 'CREATE_CONVERSATIONS_SUCCESS', payload: response});
  } catch (error) {
    console.log('error', error?.response);
    yield put({
      type: 'CREATE_CONVERSATIONS_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
    yield put(
      showToast(
        'error',
        'Conversations created',
        error?.response?.data?.error || 'Something went wrong!',
      ),
    );
  }
}

export default function* chatSaga() {
  yield takeLatest('FETCH_CHAT_REQUEST', chatList);
  yield takeLatest('FETCH_MESSAGE_REQUEST', Messages);
  yield takeLatest('SEND_MESSAGE_REQUEST', sendMessage);
  yield takeLatest('CREATE_CONVERSATIONS_REQUEST', createConversations);
}
