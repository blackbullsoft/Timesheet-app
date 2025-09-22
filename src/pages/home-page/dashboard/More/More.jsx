import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Share from 'react-native-share';

import {logoutUser} from '../../../../actions/authAction';
const Announce = require('../../../../assets/images/more/announce.png');
const Coworker = require('../../../../assets/images/more/coworker.png');
const Feedback = require('../../../../assets/images/more/feedback.png');
const Help = require('../../../../assets/images/more/help.png');
const Logout = require('../../../../assets/images/more/logout.png');
const Setting = require('../../../../assets/images/more/setting.png');
const SharePng = require('../../../../assets/images/more/share.png');

export default function More() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const {data, loading} = useSelector(state => state.profile);

  const handleLogout = () => {
    dispatch(logoutUser());
    /// temp
    //   navigation.navigate("Home")
  };
  const shareApp = async () => {
    try {
      await Share.open({
        message:
          "Timesheet is a communication and shift scheduling tool for teams like yours. I'm using Sling and love it! Try it out - ",
        url: 'https://drive.google.com/file/d/1efChFTlHN8BUVDdvu-5avG_trkt60F_x/view?usp=drive_link',
        title: 'Share Timesheet App',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigation.navigate('Home');
    }
  }, [user]);
  return (
    <ScrollView>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('Dashboard', {screen: 'Profile'})}>
        <View>
          <Image
            source={
              data?.profile_picture_url
                ? {uri: data.profile_picture_url}
                : require('../../../../assets/images/login/dummy.webp')
            }
            style={{width: 44, height: 44, borderRadius: 50}}
          />
        </View>
        <Text style={styles.lable}>Profile</Text>
      </Pressable>
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('AnnouncementList')}>
        <View style={styles.imageCard}>
          <Image source={Announce} style={styles.icon} />
        </View>
        <Text style={styles.lable}>Announcements</Text>
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('Setting')}>
        <View style={styles.imageCard}>
          <Image source={Setting} style={styles.icon} />
        </View>
        <Text style={styles.lable}>Settings</Text>
      </Pressable>
      <View style={styles.line}></View>
      <View style={styles.container}>
        <Text style={styles.lable}>Protection Services Malta </Text>
        <Pressable
          style={styles.card1}
          onPress={() => navigation.navigate('Coworkers')}>
          <View style={styles.imageCard}>
            <Image source={Coworker} style={{width: 22, height: 30}} />
          </View>
          <Text style={styles.lable}>Coworkers</Text>
        </Pressable>
      </View>
      <View style={styles.line}></View>

      <View style={styles.container}>
        <Text style={styles.lable}>Timesheet </Text>
        <Pressable
          style={styles.card1}
          onPress={() => navigation.navigate('Feedback')}>
          <View style={styles.imageCard}>
            <Image source={Feedback} style={{width: 25, height: 20}} />
          </View>
          <Text style={styles.lable}>Give us feedback</Text>
        </Pressable>

        <Pressable
          style={styles.card1}
          onPress={() => navigation.navigate('HelpAndSupport')}>
          <View style={styles.imageCard}>
            <Image source={Help} style={{width: 20, height: 25}} />
          </View>
          <Text style={styles.lable}>Help & Support</Text>
        </Pressable>
        <TouchableOpacity style={styles.card1} onPress={shareApp}>
          <View style={styles.imageCard}>
            <Image source={SharePng} style={{width: 30, height: 20}} />
          </View>
          <Text style={styles.lable}>Share Timesheet</Text>
        </TouchableOpacity>
        <Pressable style={styles.card1} onPress={() => handleLogout()}>
          <View style={styles.imageCard}>
            <Image source={Logout} style={{width: 22, height: 20}} />
          </View>
          <Text style={styles.lable}>Log Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingLeft: 40,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  lable: {
    fontSize: 12,
    fontWeight: 700,
    color: '#555555',
  },
  imageCard: {
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: '#0085FE',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 8,
    backgroundColor: '#ECEBEB',
  },
  card1: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  container: {
    width: '100%',
    paddingLeft: 40,
    paddingVertical: 24,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
