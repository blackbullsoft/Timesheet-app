export const fetchAnnouncementsList = () => ({
  type: 'FETCH_ANNOUNCEMENTS_LIST_REQUEST',
});
export const successFetchAnnouncements = data => ({
  type: 'FETCH_ANNOUNCEMENTS_LIST_SUCCESS',
  payload: {data},
});
export const failedFetchAnnouncements = () => ({
  type: 'FETCH_ANNOUNCEMENTS_LIST_FAILED',
});

export const fetchAnnouncedUserSaga = id => ({
  type: 'FETCH_ANNOUNCED_USER_REQUEST',
  payload: {id},
});

export const createAnnoucement = (announcementData, userId) => ({
  type: 'CREATE_ANNOUNCEMENT_REQUEST',
  payload: {announcementData, userId},
});

export const clearAnnouncement = () => ({type: 'CLEAR_ANNOUNCEMENT_MESSAGE'});
