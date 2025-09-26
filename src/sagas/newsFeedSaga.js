import {call, put, take, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {getToken, removeToken, storeToken} from '../utils/storage';
import {Platform} from 'react-native';
import {showToast} from '../actions/toastAction';

const API_BASE_URL = 'http://174.138.57.202:8000';

function* newsFeedList(action) {
  console.log('ActionNewsfeed', action.payload.page, action.payload);
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
      `${API_BASE_URL}/newsfeed/post?page=${action.payload.page}&limit=10`,
      config,
    );
    const data = response?.data || [];
    console.log('new feed', data, token);
    yield put({type: 'FETCH_FEED_SUCCESS', payload: data});
    return response?.data;
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

function* AddFeed(action) {
  console.log('AddFee actiond', action.payload.newsFeedText);
  // console.log('actionEdit Image', action.payload.image, action.payload.image);

  try {
    const token = yield call(getToken);
    console.log('Token in EditProfileSaga', token);

    if (!token) {
      throw new Error('No authentication token found');
    }

    // Build FormData
    const formData = new FormData();

    // if (action.payload.image) {
    //   formData.append('profile_picture', {
    //     uri: action.payload.image.uri,
    //     type: action.payload.image.type,
    //     name: action.payload.image.fileName || `photo_${Date.now()}.jpg`,
    //   });
    // }

    formData.append('content', action.payload.newsFeedText);
    // formData.append('email', action.payload.data.email);
    // formData.append('mobile', action.payload.data.mobile);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    // Make PUT request
    const response = yield call(
      axios.post,
      `${API_BASE_URL}/newsfeed/post`,
      formData,
      config,
    );

    // const data = response?.data || {};
    const payload = {
      status: response.status,
      data: response.data,
    };
    console.log('Add news feed response', response);

    yield put({type: 'ADD_NEWSFEED_SUCCESS', payload: payload});
    if (response.status == 201) {
      yield put(
        showToast(
          'success',
          'Feed create Successfully',
          // error?.response?.data?.error || 'Something went wrong!',
        ),
      );
    }
  } catch (error) {
    console.error(
      'EditProfileSaga error:',
      error.response?.data || error.message,
    );
    yield put({
      type: 'ADD_NEWSFEED_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
    yield put(
      showToast(
        'error',
        'Profile Update failed',
        error?.response?.data?.error || 'Something went wrong!',
      ),
    );
  }
}
export default function* newsFeedSaga() {
  yield takeLatest('FETCH_FEED_REQUEST', newsFeedList);
  yield takeLatest('LIKE_FEED_REQUEST', likeAndDislike);
  yield takeLatest('COMMENT_FEED_REQUEST', addComment);
  yield takeLatest('FETCH_COMMENT_REQUEST', fetchComment);
  yield takeLatest('ADD_NEWSFEED_REQUEST', AddFeed);
}
