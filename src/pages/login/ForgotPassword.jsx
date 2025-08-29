import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {showToast} from '../../actions/toastAction';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearEmail,
  forgotPasswordEmail,
  resetPassword,
} from '../../actions/authAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';

const Background = require('../../assets/images/login/Bg1.png');

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const route = useRoute();
  const {isLogin} = route.params || {isLogin: false};

  const [password, setPassword] = useState('');
  const [confimPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [timer, setTimer] = useState('60');

  const dispatch = useDispatch();
  const {email, error, loading, reset} = useSelector(state => state.auth);

  const handleForgotPassword = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const data = emailRegex.test(userEmail);
    if (!data) {
      dispatch(
        showToast(
          'error',
          'Invalid Email address',
          'Please enter a valid email address.',
        ),
      );
    } else {
      const res = dispatch(forgotPasswordEmail(userEmail));
    }

    showToast(
      'error',
      'Invalid Email address',
      'Please enter valid email address.',
    );
    console.log('Data', data);
  };
  const handleNavigateToLogin = value => {
    navigation.navigate('SignUp', {isLogin: value});
  };
  const handleResetPassword = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const data = emailRegex.test(resetEmail);
    console.log('All filed are ok', data, password, confimPassword, otp);

    if (!data) {
      dispatch(
        showToast(
          'error',
          'Invalid Email address',
          'Please enter a valid email address.',
        ),
      );
    } else if (!password) {
      dispatch(showToast('error', 'Password filed is required', ''));
    } else if (!confimPassword) {
      dispatch(showToast('error', 'Confirm password filed is required', ''));
    } else if (!otp) {
      dispatch(showToast('error', 'OTP password filed is required', ''));
    } else if (password && confimPassword && password != confimPassword) {
      dispatch(
        showToast('error', 'Password and Confirm password should be same', ''),
      );
    } else {
      dispatch(resetPassword(resetEmail, otp, password, confimPassword));
    }
  };

  useEffect(() => {
    if (email != null && email?.data?.otp) {
      console.log('INsdede');
      setOtp(email?.data?.otp);
      setTimer(60);
      setResetEmail(userEmail);
    }
  }, [email]);

  useEffect(() => {
    if (reset) {
      handleNavigateToLogin(true);
      clearEmail();
    }
  }, [reset]);

  useEffect(() => {
    if (timer <= 0) {
      setTimer(null);
      return;
    } // stop when timer reaches 0

    const interval = setInterval(() => {
      setTimer(prev => prev - 1); // ✅ always latest value
    }, 1000);

    return () => clearInterval(interval); // ✅ cleanup
  }, [timer]);

  console.log('email', email);
  // console.log('Timer', reset, loading);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={Background}
        style={{
          flex: 1,
        }}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS pushes view up, Android adjusts height
        >
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{paddingBottom: 100}}
            keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
              {email ? (
                <Text style={styles.heading}>Reset Your Password </Text>
              ) : (
                <Text style={styles.heading}>Forgot Your Password? </Text>
              )}

              {/* <Text style={styles.heading}>your Password?</Text> */}

              {!email && (
                <View>
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
                      setUserEmail(e);
                    }}
                    value={userEmail ?? ''}
                  />

                  <Pressable
                    style={[
                      styles.btnContainer,
                      {backgroundColor: loading ? 'grey' : '#0085FE'},
                    ]}
                    onPress={() => {
                      handleForgotPassword();
                    }}>
                    <Text style={[styles.btn]}>
                      {loading ? 'Loading...' : 'Submit'}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.btnContainer, styles.btnNew]}
                    onPress={() =>
                      navigation.navigate('SignUp', {isLogin: true})
                    }>
                    <Text style={[styles.btn, styles.btn1]}>
                      Return to login
                    </Text>
                  </Pressable>
                </View>
              )}

              {email && (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputFeild}
                    placeholder="Your Email"
                    placeholderTextColor="#888888"
                    onChangeText={e => {
                      console.log('E', e);
                      setResetEmail(e);
                    }}
                    value={resetEmail ?? ''}
                  />

                  <TextInput
                    style={styles.inputFeild}
                    keyboardType="decimal-pad"
                    placeholder="Your OTP"
                    placeholderTextColor="#888888"
                    onChangeText={e => {
                      console.log('E', e);
                      setOtp(e);
                    }}
                    value={otp ?? ''}
                  />
                  <View style={styles.passwordStyle}>
                    <TextInput
                      style={[styles.inputFeild, styles.passwordInput]}
                      placeholder="New Password"
                      placeholderTextColor="#555555"
                      secureTextEntry={secureText}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setSecureText(!secureText)}
                      style={styles.eyes}>
                      <Icon
                        name={secureText ? 'eye-slash' : 'eye'}
                        size={24}
                        color="#555"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.passwordStyle}>
                    <TextInput
                      style={[styles.inputFeild, styles.passwordInput]}
                      placeholder="Confirm Password"
                      placeholderTextColor="#555555"
                      secureTextEntry={secureText}
                      value={confimPassword}
                      onChangeText={setConfirmPassword}
                    />

                    <TouchableOpacity
                      onPress={() => setSecureText(!secureText)}
                      style={styles.eyes}>
                      <Icon
                        name={secureText ? 'eye-slash' : 'eye'}
                        size={24}
                        color="#555"
                      />
                    </TouchableOpacity>
                  </View>
                  <Pressable
                    disabled={timer > 0}
                    style={styles.forgotContainer}
                    onPress={() => handleForgotPassword()}>
                    <Text style={styles.forgotBtn}>Resend Code {timer}</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.btnContainer,
                      {backgroundColor: loading ? 'grey' : '#0085FE'},
                    ]}
                    onPress={() => {
                      handleResetPassword();
                    }}>
                    <Text style={[styles.btn]}>
                      {loading ? 'Loading...' : 'Submit'}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.btnContainer, styles.btnNew]}
                    onPress={() => dispatch(clearEmail())}>
                    <Text style={[styles.btn, styles.btn1]}>
                      Re-Enter your Email address
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
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
  passwordInput: {
    width: '100%',
    margin: 'auto',
  },
  passwordStyle: {
    width: '95%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  eyes: {
    position: 'absolute',
    right: 6,
    top: 25,
  },
  forgotContainer: {
    width: '90%',
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 12,
  },
  forgotBtn: {
    fontSize: 12,
    fontWeight: 600,
    color: '#01417B',
  },
});

export default ForgotPassword;
