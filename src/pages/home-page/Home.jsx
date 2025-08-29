import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Background = require('../../assets/images/login/Bg1.png');
import {TouchableOpacity} from 'react-native';
import Index from './dashboard/Index';
import {Image} from 'react-native';
import Newsfeed from './dashboard/NewsFeeds/Index';
import LinearGradient from 'react-native-linear-gradient';
// import Message from "./dashboard/Message"
import Events from './dashboard/Events/Index';
import More from './dashboard/More/Index';
import Message from '../home-page/dashboard/Messages/Index';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const getTabBarIcon = (route, focused) => {
  let imageSource;

  switch (route.name) {
    case 'Dashboard':
      imageSource = focused
        ? require('../../assets/images/dashboardIcon/dashboard1.png')
        : require('../../assets/images/dashboardIcon/dashboard.png');
      break;
    case 'Shifts':
      imageSource = focused
        ? require('../../assets/images/dashboardIcon/shifts1.png')
        : require('../../assets/images/dashboardIcon/shifts.png');
      break;
    case 'Messages':
      imageSource = focused
        ? require('../../assets/images/dashboardIcon/message1.png')
        : require('../../assets/images/dashboardIcon/message.png');
      break;
    case 'Newsfeed':
      imageSource = focused
        ? require('../../assets/images/dashboardIcon/newsfeed1.png')
        : require('../../assets/images/dashboardIcon/newsfeed.png');
      break;
    case 'More':
      imageSource = focused
        ? require('../../assets/images/dashboardIcon/more1.png')
        : require('../../assets/images/dashboardIcon/more.png');
      break;
    default:
      imageSource = require('../../assets/images/dashboardIcon/more.png');
  }

  return (
    <Image
      source={imageSource}
      style={{width: 24, height: 24, resizeMode: 'contain'}}
    />
  );
};

export default function DashBoardHome() {
  // const insits = useIns;
  const insets = useSafeAreaInsets(); // 👈 gives safe area values

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          marginBottom: 10,
          borderRadius: 15,
          borderRadius: 8,
          left: 0,
          right: 0,
          width: '90%',
          elevation: 5,
          alignSelf: 'center',
          paddingHorizontal: 2,
          padding: 2,
          paddingBottom: insets.bottom,
        },
        tabBarIcon: ({focused}) => getTabBarIcon(route, focused),
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#555555',
        tabBarActiveBackgroundColor: '#0085FE',
        tabBarButton: props => (
          <TouchableOpacity {...props} activeOpacity={1} />
        ),
      })}>
      <Tab.Screen name="Dashboard" component={Index} />
      <Tab.Screen name="Shifts" component={Events} />
      <Tab.Screen name="Messages" component={Message} />
      <Tab.Screen name="Newsfeed" component={Newsfeed} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
}
