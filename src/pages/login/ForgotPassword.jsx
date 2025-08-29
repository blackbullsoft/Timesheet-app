import {View, Text, ImageBackground, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../actions/toastAction';
import {useDispatch} from 'react-redux';
import {forgotPasswordEmail} from '../../actions/authAction';
const Background = require('../../assets/images/login/Bg1.png');

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleForgotPassword = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const data = emailRegex.test(email);
    if (!data) {
      dispatch(
        showToast(
          'error',
          'Invalid Email address',
          'Please enter a valid email address.',
        ),
      );
    } else {
      dispatch(forgotPasswordEmail(email));
    }

    showToast(
      'error',
      'Invalid Email address',
      'Please enter valid email address.',
    );
    console.log('Data', data);
  };
  return (
    <ImageBackground source={Background} style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.heading}>Forgot Your Password? </Text>
        {/* <Text style={styles.heading}>your Password?</Text> */}
        <Text style={styles.subHeading}>
          Enter your email below, and we’ll send you a recovery email.
        </Text>
        <Text style={styles.lable}>Email Address</Text>
        <TextInput
          style={styles.inputFeild}
          placeholder="Your Email"
          placeholderTextColor="#888888"
          onChangeText={e => {
            console.log('E', e);
            setEmail(e);
          }}
          value={email ?? ''}
        />

        <Pressable
          style={styles.btnContainer}
          onPress={() => {
            handleForgotPassword();
          }}>
          <Text style={[styles.btn]}>Submit</Text>
        </Pressable>
        <Pressable
          style={[styles.btnContainer, styles.btnNew]}
          onPress={() => navigation.navigate('SignUp', {isLogin: true})}>
          <Text style={[styles.btn, styles.btn1]}>Return to login</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: 'auto',
    marginTop: 64,
  },
  heading: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 700,
    marginTop: 0,
  },
  subHeading: {
    fontSize: 12,
    fontWeight: 400,
    color: '#888888',
    marginTop: 18,
  },
  lable: {
    fontSize: 12,
    fontWeight: 600,
    color: '#555555',
    marginTop: 24,
  },
  inputFeild: {
    borderWidth: 2,
    borderColor: '#ECEBEB',
    width: '95%',
    marginTop: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    color: '#555555',
    fontSize: 14,
    fontWeight: 400,
    // flex: 1,
  },
  btnContainer: {
    width: '95%',
    backgroundColor: '#0085FE',
    borderRadius: 8,
    marginTop: 20,
  },
  btnNew: {
    marginTop: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 8,
  },
  btn: {
    color: '#ffffff',
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: 600,
  },
  btn1: {
    color: '#01417B',
    borderWidth: 2,
    borderRadius: 8,
  },
});

export default ForgotPassword;
