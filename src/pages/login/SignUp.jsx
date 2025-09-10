import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, signUpUser, socialLogin} from '../../actions/authAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../actions/toastAction';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Facebook = require('../../assets/images/icon/facebook.png');
const Apple = require('../../assets/images/icon/apple.png');
const Google = require('../../assets/images/icon/google.png');
const Twitter = require('../../assets/images/icon/twitter.png');
const Background = require('../../assets/images/login/Bg.png');
export default function SignUp() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUserName] = useState('');
  const [secureText, setSecureText] = useState(true);
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [fcmToken, setFcmToken] = useState(null);
  const {isLogin} = route.params || {isLogin: false};
  const {user, error, loading} = useSelector(state => state.auth);
  const {signup, loading: signupLoading} = useSelector(state => state.signup);

  const handleLogin = async () => {
    if (loading) return;
    if (email.length == 0 || password.length == 0) {
      dispatch(
        showToast('error', 'Required Feild', 'pls filled all required feild!'),
      );
      return;
    }
    console.log('fcmToken', fcmToken, email, password);
    dispatch(loginUser(email, password, fcmToken));
  };

  const handelSocialLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo?.data?.user);
      const dataOBject = {
        id: userInfo?.data?.user?.id,
        name: userInfo?.data?.user?.name,
        email: ' ' + userInfo?.data?.user?.email,
        picture: userInfo?.data?.user?.photo,
      };
      const token = userInfo?.data?.idToken;
      if (dataOBject.email != null) {
        dispatch(socialLogin(token, dataOBject));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    if (signupLoading) return;
    if (
      email.length == 0 ||
      password.length == 0 ||
      mobile.length == 0 ||
      username.length == 0
    ) {
      dispatch(
        showToast('error', 'Required Feild', 'pls filled all required feild!'),
      );
      return;
    }
    dispatch(signUpUser(email, password, username, mobile));
  };
  const fetchFcmToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('fcmToken');
      console.log('fcmmm', storedToken);
      if (storedToken) {
        setFcmToken(storedToken);
      }
    } catch (error) {
      console.error('Error retrieving FCM token:', error);
    }
  };
  useEffect(() => {
    if (user) {
      // navigation.navigate('HomeDashboard');

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'HomeDashboard'}],
        }),
      );
    }
  }, [user, navigation]);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          // navigation.navigate('HomeDashboard');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'HomeDashboard'}],
            }),
          );
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };

    checkToken();
    fetchFcmToken();
  }, []);
  useEffect(() => {
    if (signup) {
      setEmail(''), setMobile('');
      setPassword('');
      setUserName('');
    }
  }, [signup]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '201479043285-14kki8hc2j056lftdorvi6v3fm33b090.apps.googleusercontent.com', // From Google Cloud Console
      offlineAccess: true,
    });
  }, []);

  return (
    <ImageBackground source={Background} style={{height: '100%'}}>
      <View style={isLogin ? styles.container1 : styles.container2}>
        {isLogin ? (
          <Text style={styles.heading}>Login</Text>
        ) : (
          <Text style={styles.heading}>Create Your Account</Text>
        )}
        {isLogin ? (
          <Text style={styles.subHeading}>
            Log in to manage your schedule and team.
          </Text>
        ) : (
          <Text style={styles.subHeading}>
            First, tell us a thing or two about yourself.
          </Text>
        )}

        {isLogin ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputFeild}
              placeholder="Your Email Address"
              placeholderTextColor="#555555"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.passwordStyle}>
              <TextInput
                style={[styles.inputFeild, styles.passwordInput]}
                placeholder="Password"
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
            {isLogin && (
              <Pressable
                style={styles.forgotContainer}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotBtn}>Forgot Password?</Text>
              </Pressable>
            )}
            <Pressable
              style={[
                styles.btnContainer,
                {backgroundColor: loading ? 'grey' : '#0085FE'},
              ]}
              onPress={() => handleLogin()}>
              <Text style={[styles.btn]}>
                {loading ? 'Loading...' : 'Login'}
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputFeild}
              placeholder="Full Name"
              placeholderTextColor="#555555"
              value={username}
              onChangeText={setUserName}
            />
            <TextInput
              style={styles.inputFeild}
              placeholder="Your Email Address"
              placeholderTextColor="#555555"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.inputFeild}
              placeholder="Phone Number"
              placeholderTextColor="#555555"
              value={mobile}
              onChangeText={setMobile}
            />
            <View style={styles.passwordStyle}>
              <TextInput
                style={[styles.inputFeild, styles.passwordInput]}
                placeholder="Create Password"
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
            <Pressable
              style={[
                styles.btnContainer,
                {backgroundColor: signupLoading ? 'grey' : '#0085FE'},
              ]}
              onPress={() => handleSignUp()}>
              <Text style={styles.btn}>
                {signupLoading ? 'Loading...' : 'Sign Up'}
              </Text>
            </Pressable>
          </View>
        )}

        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
          {isLogin ? (
            <Text style={styles.lineText}>Or Sign Up with</Text>
          ) : (
            <Text style={styles.lineText}>Or log in with</Text>
          )}
          <View style={styles.line}></View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={[styles.iconButton, styles.iconButton1]}>
            <Image source={Facebook} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={Twitter} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              handelSocialLogin();
            }}>
            <Image source={Google} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={Apple} />
          </TouchableOpacity>
        </View>
        {isLogin ? (
          <View style={styles.termContainer}>
            <Text style={styles.term}>Don't have an account? </Text>
            <Pressable
              onPress={() => navigation.navigate('SignUp', {isLogin: false})}>
              <Text style={{color: '#01417B', fontWeight: 900}}> Sign Up</Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={[styles.termContainer, !isLogin && styles.termContainer1]}>
            <Text style={styles.term}>By clicking sign up , </Text>
            <Text style={styles.term}>
              you agree to our{' '}
              <Text style={{color: '#0085FE'}}> terms of Service</Text> and{' '}
              <Text style={{color: '#0085FE'}}> Privacy policy</Text>
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container1: {
    width: '100%',
    padding: 8,
    height: '70%',
    paddingVertical: 10,
  },
  container2: {
    width: '100%',
    padding: 4,
    height: '100%',
  },
  heading: {
    fontSize: 36,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 700,
    marginTop: 0,
  },
  subHeading: {
    fontSize: 12,
    fontWeight: 400,
    color: '#555555',
    textAlign: 'center',
    marginTop: 8,
  },
  line: {
    borderBottomWidth: 4,
    borderColor: '#0085FE',
    marginTop: 24,
    width: '20%',
    margin: 'auto',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  inputFeild: {
    borderWidth: 2,
    borderColor: '#ECEBEB',
    width: '90%',
    marginTop: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    color: '#555555',
    fontSize: 16,
    fontWeight: 400,
  },
  btnContainer: {
    width: '90%',
    backgroundColor: '#0085FE',
    borderRadius: 8,
    marginTop: 20,
  },
  btn: {
    color: '#ffffff',
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: 600,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#0085FE',
  },
  lineText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#666666',
    fontWeight: '400',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    margin: 'auto',
  },
  iconButton: {
    borderWidth: 2,
    borderColor: '#ECEBEB',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  iconButton1: {
    paddingHorizontal: 20,
  },
  termContainer: {
    width: '90%',
    margin: 'auto',
    marginTop: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  termContainer1: {
    flexDirection: 'column',
  },
  term: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 400,
    color: '#666666',
  },
  passwordStyle: {
    width: '90%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    width: '100%',
    margin: 'auto',
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
