import {combineReducers} from 'redux';
import authReducer from './authReducer';
import eventsReducer from './eventsReducer';
import announcementsReducer from './announcementsReducer';
import profileReducer from './profileReducer';
import toastReducer from './toastReducer';
import coworkersReducer from './coworkersReducer';
import signupReducer from './signupReducer';
import userProfileReducer from './userProfileReducer';
import notificationsReducer from './notificationsReducer';
import notificationReducer from './notificationReducer';
import shiftReducer from './shiftReducer';
import chatReducer from './chatReducer';
import newsFeedReducer from './newsFeedReducer';
import userSettingReducer from './userSettingReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  announcements: announcementsReducer,
  profile: profileReducer,
  userProfile: userProfileReducer,
  toast: toastReducer,
  coworkers: coworkersReducer,
  signup: signupReducer,
  notifications: notificationsReducer,
  notification: notificationReducer,
  shift: shiftReducer,
  chat: chatReducer,
  newsFeed: newsFeedReducer,
  userSettings: userSettingReducer,
});

export default rootReducer;
