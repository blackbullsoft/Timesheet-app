import {all} from 'redux-saga/effects';
import authSaga from './authSaga';
import eventsSaga from './eventsSaga';
import announcementsSaga from './announcementsSaga';
import profileSaga from './profileSaga';
import userProfileSaga from './userProfileSaga';
import feedbackSaga from './feedbackSaga';
import coworkerSaga from './coworkersSaga';
import notificationsSaga from './notificationsSaga';
import notificationSaga from './notificationSaga';
import shiftSaga from './shiftSaga';
import chatSaga from './chatSaga';
import newsFeedSaga from './newsFeedSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    eventsSaga(),
    announcementsSaga(),
    profileSaga(),
    feedbackSaga(),
    coworkerSaga(),
    userProfileSaga(),
    notificationsSaga(),
    notificationSaga(),
    shiftSaga(),
    chatSaga(),
    newsFeedSaga(),
  ]);
}
