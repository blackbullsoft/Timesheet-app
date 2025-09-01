import {View, Text, TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MessageList from './MessageList';
import UserList from './UserList';
import Message from './Message';
const Stack = createStackNavigator();
const CustomHeader = () => {
  // const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        source={{
          uri: 'https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg',
        }}
        style={{width: 44, height: 44, borderRadius: 50}}
      />
      <View style={{marginLeft: 8}}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 700,
            color: '#ffffff',
          }}>
          Messages
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            fontWeight: 400,
            color: '#65B6FF',
          }}>
          Online
        </Text>
      </View>
    </View>
  );
};
export default function Index() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MessageScreen">
      <Stack.Screen
        name="MessageScreen"
        component={MessageList}
        options={({navigation}) => ({
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'All Conversations',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 12,
          },
          headerStyle: {height: 100},
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('UserListScreen')}>
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
        })}
      />
      <Stack.Screen
        name="UserListScreen"
        component={UserList}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'Select User',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 12,
          },
          headerStyle: {height: 100},
          headerRight: () => (
            <TouchableOpacity>
              <Text style={{color: 'white', marginRight: 12}}>Save</Text>
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
        name="Message"
        component={Message}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: () => <CustomHeader />,
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
    </Stack.Navigator>
  );
}
