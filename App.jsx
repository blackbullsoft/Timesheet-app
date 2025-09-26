import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import Home from './src/pages/login/Home';
import SignUp from './src/pages/login/SignUp';
import LinearGradient from 'react-native-linear-gradient';
import ForgotPassword from './src/pages/login/ForgotPassword';
import DashBoardHome from './src/pages/home-page/Home';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from './src/actions/toastAction';
import {useDispatch} from 'react-redux';
import {createNavigationContainerRef} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScrollVIewComp from './src/pages/login/ScrollVIewComp';
import notifee from '@notifee/react-native';
import {
  setupChannel,
  setupNotificationChannel,
  showNotification,
} from './src/component/noification/notificationService';
export const navigationRef = createNavigationContainerRef();
const Stack = createStackNavigator();

export default function App() {
  const [fcmToken, setFcmToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setupNotificationChannel();
    setupChannel();
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('✅ Notification permission granted.');
        getFcmToken();
      } else {
        console.log('❌ Notification permission denied.');
      }
    };

    const requestPermission = async () => {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus >= 1) {
        console.log('✅ Notification permission granted');
      } else {
        console.log('❌ Notification permission denied');
      }
    };

    const getFcmToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('🔑 FCM Token:', token);
        setFcmToken(token);

        // Store FCM token in AsyncStorage
        await AsyncStorage.setItem('fcmToken', token);
      } catch (error) {
        console.log('⚠️ Error getting FCM token:', error);
      }
    };
    requestPermission();

    requestUserPermission();

    // Foreground Notification Listener
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      const title = remoteMessage?.notification?.title;
      const body = remoteMessage?.notification?.body;

      dispatch(showToast('success', title, body));
      await showNotification(title, body);
    });

    // Background Notification Clicked
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        navigateToNotification(remoteMessage);
      }
    });

    // Quit State Notification Clicked
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          navigateToNotification(remoteMessage);
        }
      });

    return () => {
      unsubscribeForeground();
    };
  }, []);

  const navigateToNotification = remoteMessage => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('Dashboard', {data: remoteMessage.data});
    } else {
      setTimeout(() => {
        if (navigationRef.isReady()) {
          navigationRef.navigate('Dashboard', {data: remoteMessage.data});
        }
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ScrollView" component={ScrollVIewComp} />

          <Stack.Screen
            name="SignUp"
            component={SignUp}
            initialParams={{isLogin: false}}
            options={{
              headerShown: true,
              headerBackground: () => (
                <LinearGradient
                  colors={['#0085FE', '#01417B']}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 1}}
                  style={{flex: 1}}
                />
              ),
              headerTintColor: 'white',
              headerBackTitleVisible: false,
              title: '',
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerShown: true,
              headerTintColor: 'white',
              headerTitle: '', // Hide title
              headerLeft: () => null,
              headerBackground: () => (
                <LinearGradient
                  colors={['#0085FE', '#01417B']}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 1}}
                  style={{flex: 1}}
                />
              ),
            }}
          />
          <Stack.Screen name="HomeDashboard" component={DashBoardHome} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
