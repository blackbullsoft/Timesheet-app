import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {getToken, removeToken, storeToken} from '../utils/storage';
import {Platform} from 'react-native';

const API_BASE_URL = 'http://174.138.57.202:8000';

function* newsFeedList() {
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
      `${API_BASE_URL}/newsfeed/post`,
      config,
    );
    const data = response?.data || [];
    console.log('new feed', data, token);
    yield put({type: 'FETCH_FEED_SUCCESS', payload: data});
  } catch (error) {
    console.log(error);
    yield put({
      type: 'FETCH_FEED_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}

function* likeAndDislike(action) {
  console.log('Like action payload', action.payload.newsFeedId);
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

    console.log('COnfig for newfeed', config);
    const response = yield call(
      axios.post,
      `${API_BASE_URL}/newsfeed/post/like/${action.payload.newsFeedId}`,
      {},
      config,
    );
    const data = response?.data || [];
    console.log('LIke message', data);
    yield put({
      type: 'LIKE_FEED_SUCCESS',
      payload: {
        newsFeedId: action.payload.newsFeedId, // keep track of which feed
        isLiked: data.message?.includes('unliked') ? 0 : 1, // decide like/unlike
      },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: 'LIKE_FEED_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}

function* addComment(action) {
  console.log('addComment action payload', action.payload.content);
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

    console.log('COnfig for newfeed', config);
    const response = yield call(
      axios.post,
      `${API_BASE_URL}/newsfeed/post/comment`,
      {
        feedId: action.payload.feedId,
        comment: action.payload.content,
      },
      config,
    );
    const data = response?.data || [];
    console.log('comment message', data);
    yield put({type: 'COMMENT_FEED_SUCCESS', payload: data});
  } catch (error) {
    console.log(error);
    yield put({
      type: 'COMMENT_FEED_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}
function* fetchComment(action) {
  console.log('fetchComment action payload', action.payload.feedId);
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

    console.log('Fetch comment config', config);
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/newsfeed/post/comment/${action.payload.feedId}`,
      // {},
      config,
    );
    const data = response?.data || [];
    console.log('new feed', data, token);
    yield put({type: 'FETCH_COMMENT_SUCCESS', payload: data});
  } catch (error) {
    console.log(error);
    yield put({
      type: 'FETCH_COMMENT_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}
export default function* newsFeedSaga() {
  yield takeLatest('FETCH_FEED_REQUEST', newsFeedList);
  yield takeLatest('LIKE_FEED_REQUEST', likeAndDislike);
  yield takeLatest('COMMENT_FEED_REQUEST', addComment);
  yield takeLatest('FETCH_COMMENT_REQUEST', fetchComment);
}
