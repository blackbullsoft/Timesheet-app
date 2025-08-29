import { View, Text, TouchableOpacity, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import EventsList from './EventList';
import Event from './Event';
import Location from './Location';
import UserProfile from './UserProfile';
const Stack = createStackNavigator();
export default function Index() {
  return ( 
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="EventsList" >
        <Stack.Screen 
          name="EventsList" 
          component={EventsList} 
          options={({ navigation, route }) => ({
                  headerShown: true,
                  headerTintColor: 'white', 
                  headerTitle: '', 
                  headerBackground: () => (
                    <LinearGradient
                      colors={['#0085FE', '#01417B']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={{ flex: 1 }}
                    />
                  ),
                  headerRight: () => (
                        <TouchableOpacity onPress={() => console.log('Image Pressed')}>
                          <Image
                          source={require('../../../../assets/images/icon/menu1.png')}
                            style={{ marginRight:20,width:6,height:25 }}
                          />
                        </TouchableOpacity>
                      ),
                      headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.setParams({ model: true })}>
                          <Image
                          source={require('../../../../assets/images/icon/menu.png')}
                            style={{ marginLeft:20,width:25,height:25 }}
                          />
                        </TouchableOpacity>
                      ),
                  
                    })}             
        /> 
        <Stack.Screen 
          name="Event" 
          component={Event} 
          options={{ 
            headerShown: true,
            headerTintColor: 'white', 
            headerTitle: 'Shift', 
            headerTitleAlign:'center',
            headerTitleStyle:{
              fontSize:12
            },
            headerBackground: () => (
              <LinearGradient
                colors={['#0085FE', '#01417B']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ flex: 1 }}
              />
            ),
          }} 
        /> 
         <Stack.Screen 
          name="UserProfile" 
          component={UserProfile} 
          options={{ 
            headerShown: true,
            headerTintColor: 'white', 
            headerTitle: 'Profile', 
            headerTitleAlign:'center',
            headerTitleStyle:{
              fontSize:12
            },
            headerBackground: () => (
              <LinearGradient
                colors={['#0085FE', '#01417B']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ flex: 1 }}
              />
            ),
          }} 
        />    
        <Stack.Screen 
          name="Location" 
          component={Location} 
          options={{ 
            headerShown: true,
            headerTintColor: 'white', 
            headerTitle: 'Location', 
            headerTitleAlign:'center',
            headerTitleStyle:{
              fontSize:12
            },
            headerBackground: () => (
              <LinearGradient
                colors={['#0085FE', '#01417B']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ flex: 1 }}
              />
            ),
          }} 
        />        
      </Stack.Navigator>  
  )
}