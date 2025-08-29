export const fetchAnnouncementsList = () => ({
    type: 'FETCH_ANNOUNCEMENTS_LIST_REQUEST',
  });
export const successFetchAnnouncements = (data) => ({
    type: 'FETCH_ANNOUNCEMENTS_LIST_SUCCESS',
    payload: {data},
  });
export const failedFetchAnnouncements = () => ({
    type: 'FETCH_ANNOUNCEMENTS_LIST_FAILED',
  });