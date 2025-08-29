export const sendFeedback = (totalStart,feedback) => ({
    type: 'SEND_FEEDBACK_REQUEST',
    payload: {totalStart,feedback },
  });