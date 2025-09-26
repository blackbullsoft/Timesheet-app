// notificationService.js
import notifee, {AndroidImportance} from '@notifee/react-native';

export async function setupNotificationChannel() {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  return channelId;
}

export async function showNotification(title, body) {
  const channelId = await setupNotificationChannel();

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}
