import { View, Text, TouchableOpacity, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import NotificationList from "./NotificationList"
import NotificationCard from "./NotificationCard"
import Event from '../Events/Event';
import Location from '../Events/Location';
import UserProfile from '../Events/UserProfile';
const Stack = createStackNavigator();
export default function Index() {
  return ( 
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="NotificationList" >
        <Stack.Screen 
          name="NotificationList" 
          component={NotificationList}               
        /> 
         <Stack.Screen 
          name="NotificationCard" 
          component={NotificationCard}   
          options={{ 
                      headerShown: true,
                      headerTintColor: 'white', 
                      headerTitle: 'Shift  notifications', 
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