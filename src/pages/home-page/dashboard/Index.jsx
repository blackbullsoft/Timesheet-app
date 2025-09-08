import {View, Text, TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from './Home';
import LinearGradient from 'react-native-linear-gradient';
import Profile from './Profile';
import Roaster from './Roaster';
import NotificationList from './Dashboard/Index';
const Stack = createStackNavigator();
export default function Index() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="DashboardScreen">
      <Stack.Screen name="DashboardScreen" component={NotificationList} />
      <Stack.Screen
        name="Roaster"
        component={Roaster}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'Today’s Roster',
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
        name="Profile"
        component={Profile}
        options={({navigation, route}) => ({
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'Profile',
          headerBackground: () => (
            <LinearGradient
              colors={['#0085FE', '#01417B']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              style={{flex: 1}}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.setParams({isEdit: !route.params?.isEdit})
              }>
              <Image
                source={require('../../../assets/images/dashboardIcon/edit.png')}
                style={{width: 60, height: 30, marginRight: 12}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Newsfeed"
        component={Roaster}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'Newsfeed',
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
    </Stack.Navigator>
  );
}
