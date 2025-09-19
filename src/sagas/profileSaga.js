import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import API_BASE_URL from '../config';
import {getToken, removeToken, storeToken} from '../utils/storage';
import {showToast} from '../actions/toastAction';

function* fetchProfileSaga(action) {
  console.log('Action', action.payload);
  try {
    const token = yield call(getToken);
    console.log('Token in fetch profile saga', token);
    if (!token) {
      throw new Error('No authentication token found fetch profile');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const userId = action.payload.userId;
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/user/profile/view/${userId}`,
      config,
    );
    const data = response?.data || [];
    console.log('fetchProfileSaga', data, token);
    yield put({type: 'FETCH_PROFILE_SUCCESS', payload: data});
  } catch (error) {
    console.log(error);
    yield put({
      type: 'FETCH_PROFILE_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}

function* EditProfileSaga(action) {
  console.log('actionEdit', action.payload.data);
  console.log('actionEdit Image', action.payload.image, action.payload.image);

  try {
    const token = yield call(getToken);
    console.log('Token in EditProfileSaga', token);

    if (!token) {
      throw new Error('No authentication token found');
    }

    // Build FormData
    const formData = new FormData();

    if (action.payload.image) {
      formData.append('profile_picture', {
        uri: action.payload.image.uri,
        type: action.payload.image.type,
        name: action.payload.image.fileName || `photo_${Date.now()}.jpg`,
      });
    }

    formData.append('username', action.payload.data.username);
    formData.append('email', action.payload.data.email);
    formData.append('mobile', action.payload.data.mobile);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const userId = action.payload.data.id;

    // Make PUT request
    const response = yield call(
      axios.put,
      `${API_BASE_URL}/user/edit/${userId}`,
      formData,
      config,
    );

    // const data = response?.data || {};
    const payload = {
      status: response.status,
      data: response.data,
    };
    // console.log('EditProfileSaga response', response);

    yield put({type: 'EDIT_PROFILE_SUCCESS', payload: payload});

    yield put(
      showToast(
        'success',
        payload.data.message,
        // error?.response?.data?.error || 'Something went wrong!',
      ),
    );
  } catch (error) {
    console.error(
      'EditProfileSaga error:',
      error.response?.data || error.message,
    );
    yield put({
      type: 'EDIT_PROFILE_FAILED',
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

export default function* profileSaga() {
  yield takeLatest('FETCH_PROFILE_REQUEST', fetchProfileSaga);
  yield takeLatest('EDIT_PROFILE_REQUEST', EditProfileSaga);
}
