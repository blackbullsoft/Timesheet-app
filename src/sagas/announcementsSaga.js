import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import API_BASE_URL from '../config';
import {getToken, removeToken, storeToken} from '../utils/storage';
import {showToast} from '../actions/toastAction';

function* fetchAnnouncementsSaga(action) {
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
    // const response = yield call(axios.get, `${API_BASE_URL}/events/view`, config)
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/announcement`,
      config,
    );

    const announcements = response?.data || [];
    yield put({
      type: 'FETCH_ANNOUNCEMENTS_LIST_SUCCESS',
      payload: announcements,
    });
  } catch (error) {
    yield put({
      type: 'FETCH_ANNOUNCEMENTS_LIST_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}

function* fetchAnnouncedUserSaga(action) {
  const id = action.payload.id;
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
    // const response = yield call(axios.get, `${API_BASE_URL}/events/view`, config)
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/announcement/${id}/announced-users`,
      config,
    );

    const announcements = response?.data || [];
    yield put({
      type: 'FETCH_ANNOUNCED_USER_SUCCESS',
      payload: announcements,
    });
  } catch (error) {
    yield put({
      type: 'FETCH_ANNOUNCED_USER_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
  }
}

function* createAnnoucement(action) {
  // const {creater, list} = action.payload.announcementData;

  console.log(
    'action.payload created',
    action.payload.announcementData,
    action.payload.userId,
  );

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

    const dataPayload = {
      title: action.payload.announcementData.title,
      content: action.payload.announcementData.description,
      announcementUsers: [
        ...action.payload.announcementData.selectedUser,
        action.payload.userId,
      ],
    };

    console.log('dataPayload', dataPayload);
    const response = yield call(
      axios.post,
      `${API_BASE_URL}/announcement/post`,

      dataPayload,

      config,
    );
    const data = response?.data || [];

    console.log('Create announcement', data, response);
    yield put(showToast('success', response.data.message));

    yield put({
      type: 'CREATE_ANNOUNCEMENT_SUCCESS',
      payload: {
        data: response.data, // your actual data
        status: response.status, // status code
        message: response.data.message,
      },
    });
  } catch (error) {
    console.log('error', error?.response);
    yield put({
      type: 'CREATE_ANNOUNCEMENT_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
    yield put(
      showToast(
        'error',
        'Announcement not created',
        error?.response?.data?.error || 'Something went wrong!',
      ),
    );
  }
}
export default function* announcementsSaga() {
  yield takeLatest('FETCH_ANNOUNCEMENTS_LIST_REQUEST', fetchAnnouncementsSaga);
  yield takeLatest('FETCH_ANNOUNCED_USER_REQUEST', fetchAnnouncedUserSaga);
  yield takeLatest('CREATE_ANNOUNCEMENT_REQUEST', createAnnoucement);
}
