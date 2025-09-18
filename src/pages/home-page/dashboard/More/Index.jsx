import {View, Text, TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import More from './More';
import Coworkers from './Coworkers';
import AnnouncementList from './AnnouncementList';
import Announcement from './Announcement';
import Feedback from './Feedback';
import Setting from './Setting';
import HelpAndSupport from './HelpAndSupport';
import UserProfile from '../Events/UserProfile';
const Stack = createStackNavigator();
export default function Index() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MoreScreen">
      <Stack.Screen
        name="MoreScreen"
        component={More}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'More',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 12,
          },
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
      <Stack.Screen
        name="Coworkers"
        component={Coworkers}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'Employees',
          headerTitleAlign: 'center',
          headerStyle: {height: 100},
          headerTitleStyle: {
            fontSize: 12,
          },
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
      <Stack.Screen
        name="AnnouncementList"
        component={AnnouncementList}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'Announcement',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 12,
          },
          headerRight: () => (
            <TouchableOpacity>
              <Image
                source={require('../../../../assets/images/icon/add.png')}
                style={{width: 18, height: 18, marginRight: 12}}
              />
            </TouchableOpacity>
          ),
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
      <Stack.Screen
        name="Announcement"
        component={Announcement}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'Announcement',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 12,
          },
          headerRight: () => (
            <TouchableOpacity>
              <Image
                source={require('../../../../assets/images/icon/dots.png')}
                style={{width: 4, height: 16, marginRight: 12}}
              />
            </TouchableOpacity>
          ),
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
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'Feedback',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 12,
          },
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

      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        // options={{
        //   headerShown: true,
        //   headerTintColor: 'white',
        //   headerTitle: 'Feedback',
        //   headerTitleAlign: 'center',
        //   headerTitleStyle: {
        //     fontSize: 12,
        //   },
        //   headerBackground: () => (
        //     <LinearGradient
        //       colors={['#0085FE', '#01417B']}
        //       start={{x: 1, y: 0}}
        //       end={{x: 0, y: 1}}
        //       style={{flex: 1}}
        //     />
        //   ),
        // }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'Setting',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 12,
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Image Pressed')}>
              <Image
                source={require('../../../../assets/images/icon/menu1.png')}
                style={{marginRight: 20, width: 5, height: 20}}
              />
            </TouchableOpacity>
          ),
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
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
    </Stack.Navigator>
  );
}
