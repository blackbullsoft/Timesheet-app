import moment from 'moment';

export const formatDateTime = dateString => {
  const date = moment(dateString);

  if (date.isSame(moment(), 'day')) {
    // If it's today → show only time
    return date.format('hh:mm A');
  } else {
    // If it's not today → show date + time
    return date.format('D MMMM hh:mm A');
  }
};
