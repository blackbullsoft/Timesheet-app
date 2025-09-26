import notifee, {TriggerType, AndroidImportance} from '@notifee/react-native';

// Setup notification channel (do this in App.js once)

// Schedule alarm
export async function scheduleAlarm(minutes) {
  const date = new Date(Date.now() + minutes * 60 * 1000); // dynamic time

  await notifee.createTriggerNotification(
    {
      title: '⏰ Shift Reminder',
      body: `Your shift starts in ${minutes} minutes!`,
      android: {
        channelId: 'alarm',
        importance: AndroidImportance.HIGH,
        pressAction: {id: 'default'},
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    },
  );
}
