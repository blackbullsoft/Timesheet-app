import { View, Text, TouchableOpacity, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Newsfeed from '../Newsfeed';
import NewFeedPage from './NewFeedPage';
const Stack = createStackNavigator();
export default function Index() {
  
  return ( 
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Newsfeed" >
        <Stack.Screen 
          name="Newsfeed" 
          component={Newsfeed} 
          options={({ navigation })  => ({
                  headerShown: true,
                  headerTintColor: 'white', 
                  headerTitle: 'Newsfeed', 
                  headerTitleAlign:"center",
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
                  headerRight: () => (
                              <TouchableOpacity onPress={()=>navigation.navigate("NewsfeedPage")}>
                                <Image
                                  source={require('../../../../assets/images/icon/add.png')}
                                  style={{ width: 18, height: 18, marginRight: 12 }}
                                />
                              </TouchableOpacity>
                            ),
                      headerLeft: () => (
                        <TouchableOpacity onPress={() => console.log('Image Pressed')}>
                         <Text style={{fontSize:14,fontWeight:400,color:"#ffffff",marginLeft:10}}>Pages</Text>
                        </TouchableOpacity>
                      ),
                  
                    })}
                        
        /> 
         <Stack.Screen 
          name="NewsfeedPage" 
          component={NewFeedPage} 
          options={{ 
                  headerShown: true,
                  headerTintColor: 'white', 
                  headerTitle: 'Newsfeed', 
                  headerTitleAlign:"center",
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
                  headerRight: () => (
                              <TouchableOpacity >
                                <Image
                                  source={require('../../../../assets/images/icon/dots.png')}
                                  style={{ width: 5, height: 20, marginRight: 12 }}
                                />
                              </TouchableOpacity>
                            ),
                      
                }}             
        /> 
            
      </Stack.Navigator>  
  )
}