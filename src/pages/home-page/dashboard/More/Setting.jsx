import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/Entypo';
import notifee, {TriggerType, AndroidImportance} from '@notifee/react-native';

import {
  clearUpdateSettingResponse,
  fetchUserSettingRequest,
  updateUserSettingRequest,
  userSetting,
} from '../../../../actions/userSettingAction';
import {Mincount} from '../../../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scheduleAlarm} from '../../../../component/noification/ScheduleNotification';
const rightGrey = require('../../../../assets/images/icon/rightGrey.png');

export default function Setting() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [fcmToken, setFcmToken] = useState(null);
  const {userSettingList, userSettingUpdate} = useSelector(
    state => state.userSettings,
  );
  const [isEnabledObject, setIsEnabledObject] = useState({
    messageSound: false,
    showWhenTyping: false,
    shiftSound: false,
    shift_alarm_enabled: false,
    dashboard_notification: false,
    email_dashboard_notification: false,
    message_notification: false,
    email_message_notification: false,
    newsfeed_notification: false,
    email_newsfeed_notification: false,
    shift_alarm_minutes: '',
  });

  const navigation = useNavigation();
  const fetchFcmToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('fcmToken');
      console.log('fcmmm', storedToken);
      if (storedToken) {
        setFcmToken(storedToken);
        dispatch(fetchUserSettingRequest(storedToken));
      }
    } catch (error) {
      console.error('Error retrieving FCM token:', error);
    }
  };
  const dispatch = useDispatch();
  const data = [
    {label: 'Check page', value: '1'},
    {label: 'Demo Conversation', value: '2'},
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [enabled, setEnabled] = useState();

  const toggleAlarm = async () => {
    if (!enabled) {
      await scheduleAlarm(1); // 10 min alarm
      setEnabled(true);
    } else {
      await notifee.cancelAllNotifications();
      setEnabled(false);
    }
  };
  const handleToggleSwitch = (key, value) => {
    setIsEnabledObject(prevState => {
      if (key === 'shift_alarm_minutes') {
        return {
          ...prevState,
          [key]: value, // directly set given value
        };
      } else {
        return {
          ...prevState,
          [key]: !prevState[key], // toggle
        };
      }
    });
  };

  console.log(
    'isEnabledObject',
    isEnabledObject.shift_alarm_minutes.toString(),
  );

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    console.log('User settin enable');

    fetchFcmToken();
  }, []);

  useEffect(() => {
    // toggleAlarm();
  }, [isEnabled]);

  const saveUserSetting = () => {
    dispatch(updateUserSettingRequest(isEnabledObject, fcmToken));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => saveUserSetting()}>
          <Text style={{color: 'white', marginRight: 12}}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isEnabledObject]);

  useEffect(() => {
    if (userSettingList) {
      setEnabled(userSettingList?.shift_alarm_enabled == 0 ? false : true);
      const data = {
        shift_alarm_enabled:
          userSettingList?.shift_alarm_enabled == 0 ? false : true,
        dashboard_notification:
          userSettingList?.dashboard_notification == 0 ? false : true,
        email_dashboard_notification:
          userSettingList?.email_dashboard_notification == 0 ? false : true,
        message_notification:
          userSettingList?.message_notification == 0 ? false : true,
        email_message_notification:
          userSettingList?.email_message_notification == 0 ? false : true,
        newsfeed_notification:
          userSettingList?.newsfeed_notification == 0 ? false : true,
        email_newsfeed_notification:
          userSettingList?.email_newsfeed_notification == 0 ? false : true,
        shift_alarm_minutes: userSettingList?.shift_alarm_minutes,
      };
      if (data) {
        setIsEnabledObject(data);
      }
    }
  }, [userSettingList]);

  useEffect(() => {
    if (userSettingUpdate && userSettingUpdate?.status == 200) {
      dispatch(clearUpdateSettingResponse());

      navigation.goBack();
    }
    // clearUpdateSettingResponse();
  }, [userSettingUpdate]);

  console.log('userSettingUpdate', userSettingUpdate);
  //   const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  console.log('userSettingList', enabled);
  return (
    <ScrollView>
      {/* <View style={styles.container}>
        <Text style={styles.lable}>Messages</Text>
        <View style={styles.box}>
          <Text style={styles.value}>Play Sound effects</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabledObject.messageSound ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleToggleSwitch('messageSound')}
            value={isEnabledObject.messageSound}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.value}>Show others when i’m typing </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabledObject.showWhenTyping ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleToggleSwitch('showWhenTyping')}
            value={isEnabledObject.showWhenTyping}
          />
        </View>
      </View> */}
      <View style={styles.line}></View>
      {/* <View style={styles.container}>
        <Text style={styles.lable}>Shifts</Text>
        <View style={styles.box}>
          <Text style={styles.value}>Play Sound Effects</Text>
          <View style={styles.right}>
            <Text style={styles.value}>1:40 PM </Text>
            <Image source={rightGrey} />
          </View>
        </View>
      </View> */}
      <View style={styles.line}></View>
      <View style={styles.container}>
        {/* <Text style={styles.lable}>Shift alarms</Text>
        <View style={styles.box}>
          <Text style={styles.value}>Enable Shift alarms</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={
              isEnabledObject.shift_alarm_enabled ? '#ffffff' : '#f4f3f4'
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleToggleSwitch('shift_alarm_enabled')}
            value={isEnabledObject.shift_alarm_enabled}
          />
        </View> */}
        {/* <View style={styles.box}>
          <Text style={styles.value}>Reminder before</Text>
          <View
            style={[
              styles.right,
              {
                maxWidth: '47%',
              },
            ]}>
         
            <Dropdown
              style={[styles.dropdown, isFocus]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.value}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={Mincount}
              //   search
              maxHeight={300}
              labelField="value"
              autoScroll={false}
              valueField="value"
              // placeholder={!isFocus ? '1' : '1'}

              searchPlaceholder="Search..."
              value={isEnabledObject?.shift_alarm_minutes.toString()}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                // setValue(item.value);
                handleToggleSwitch('shift_alarm_minutes', item.value);
                setIsFocus(false);
              }}
            />
            <Text style={[styles.value]}>Minutes </Text>
          </View>
        </View> */}
      </View>
      <View style={styles.line}></View>
      <View style={styles.container}>
        <Text style={styles.lable}>Dashboard notifications</Text>

        <View style={styles.box}>
          <Text style={styles.value}>Notify Via Push Notifications</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={
              isEnabledObject.dashboard_notification ? '#ffffff' : '#f4f3f4'
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleToggleSwitch('dashboard_notification')}
            value={isEnabledObject.dashboard_notification}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.value}>Notify Via Email</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={
              isEnabledObject.email_dashboard_notification
                ? '#ffffff'
                : '#f4f3f4'
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={() =>
              handleToggleSwitch('email_dashboard_notification')
            }
            value={isEnabledObject.email_dashboard_notification}
          />
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.container}>
        <Text style={styles.lable}>Massage notifications</Text>

        <View style={styles.box}>
          <Text style={styles.value}>Notify Via Push Notifications</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={
              isEnabledObject.message_notification ? '#ffffff' : '#f4f3f4'
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleToggleSwitch('message_notification')}
            value={isEnabledObject.message_notification}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.value}>Notify Via Email</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={
              isEnabledObject?.email_message_notification
                ? '#ffffff'
                : '#f4f3f4'
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={() =>
              handleToggleSwitch('email_message_notification')
            }
            value={isEnabledObject?.email_message_notification}
          />
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.container}>
        <Text style={styles.lable}>Newsfeed notifications</Text>
        <View style={styles.box}>
          <Text style={styles.value}>Notify Via Push Notifications</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={
              isEnabledObject?.newsfeed_notification ? '#ffffff' : '#f4f3f4'
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleToggleSwitch('newsfeed_notification')}
            value={isEnabledObject?.newsfeed_notification}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.value}>Notify Via Email</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={
              isEnabledObject?.email_newsfeed_notification
                ? '#ffffff'
                : '#f4f3f4'
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={() =>
              handleToggleSwitch('email_newsfeed_notification')
            }
            value={isEnabledObject?.email_newsfeed_notification}
          />
        </View>
      </View>
      <View style={styles.line}></View>
      <View
        style={[
          styles.box,
          {width: '90%', margin: 'auto', marginBottom: 20, marginTop: 20},
        ]}>
        <Text style={styles.value}>App Version</Text>
        <View style={styles.right}>
          <Text style={styles.value}>3.0.485 </Text>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginHorizontal: 'auto',
    padding: 12,
  },
  box: {
    borderWidth: 1,
    borderColor: '#C7C7C7',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lable: {
    fontSize: 12,
    fontWeight: 600,
    color: '#555555',
  },
  value: {
    fontSize: 12,
    fontWeight: 400,
    color: '#888888',
  },
  line: {
    height: 8,
    backgroundColor: '#ECEBEB',
    borderWidth: 0.4,
    borderColor: '#0000001F',
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  dropdown: {
    height: 30,
    // borderColor: 'gray',
    // borderWidth: 0.5,
    // borderRadius: 8,
    paddingHorizontal: 8,
    width: '49%',
    // backgroundColor: 'red',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
