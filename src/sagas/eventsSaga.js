import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import API_BASE_URL from '../config';
import {Alert} from 'react-native';
import {getToken, removeToken, storeToken} from '../utils/storage';

function* fetchEventsSaga(action) {
  try {
    let startDate = action.payload.startDate;
    let endDate = action.payload.endDate;
    let isMyShedule = action.payload.myshedule;
    let userId = action.payload.userId;
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
    let api = null;
    if (isMyShedule) {
      api = `${API_BASE_URL}/timesheet/v2/employee/entryview?startDate=${startDate}&endDate=${endDate}&userId=${userId}`;
    } else {
      api = `${API_BASE_URL}/timesheet/v2/employee/entryview?startDate=${startDate}&endDate=${endDate}`;
    }
    const response = yield call(axios.get, api, config);
    const events = response?.data?.employees || [];

    console.log('events', events);
    const totalHours = events.reduce(
      (total, entry) => total + parseFloat(entry.hours),
      0,
    );

    const transformedEvents = events.reduce((acc, event) => {
      const {
        date,
        username,
        location,
        eventColor,
        startTime,
        endTime,
        hours,
        employeeId,
        timesheet_id,
      } = event;

      // Format event object as per previous format
      const formattedEvent = {
        timesheetId: timesheet_id,
        name: username,
        location: location,
        backgroundColor: eventColor,
        employeeId: employeeId,
        day: true,
        timing: `${startTime} - ${endTime}, ${hours} hours`,
        isFullDay: startTime === '00:00:00' && endTime === '23:59:59',
      };
      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(formattedEvent);
      return acc;
    }, {});
    yield put({
      type: 'FETCH_EVENT_LIST_SUCCESS',
      payload: {data: transformedEvents, totalHours},
    });
  } catch (error) {
    yield put({
      type: 'FETCH_EVENT_LIST_FAILED',
      payload: error?.response?.data?.error || 'Something went wrong!',
    });
    yield put({
      type: 'FETCH_EVENT_LIST_SUCCESS',
      payload: {data: [], totalHours: 0},
    });
  }
}
export default function* eventsSaga() {
  yield takeLatest('FETCH_EVENT_LIST_REQUEST', fetchEventsSaga);
}
