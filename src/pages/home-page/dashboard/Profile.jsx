import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {EditProfileSaga, fetchProfile} from '../../../actions/profileAction';
import LoadingAnimation from '../../../component/Loader';
import PhoneInput from 'react-native-phone-number-input';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import ModModalComponental from '../../../component/ModalComponent';

const Background = require('../../../assets/images/login/Bg1.png');
const Admin = require('../../../assets/images/icon/admin.png');
const Web = require('../../../assets/images/icon/web.png');
const Admin1 = require('../../../assets/images/icon/admin1.png');
const Web1 = require('../../../assets/images/icon/web1.png');
const Right = require('../../../assets/images/icon/right.png');

export default function Profile({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(route.params?.isEdit || false);
  const {data} = useSelector(state => state.profile);
  const {loading, editProfile} = useSelector(state => state.userProfile);
  const {user} = useSelector(state => state.auth);

  const phoneInputRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState(data?.mobile?.slice(3) || '');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [countryCode, setCountryCode] = useState('IN'); // Default
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [userEditData, setUserEditData] = useState(data);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (route.params?.isEdit !== undefined) {
      setIsEdit(route.params.isEdit);
    }
  }, [route.params?.isEdit]);

  const handleValue = (key, value) => {
    setUserEditData(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  console.log('datadata Profile', countryCode, userEditData, data);
  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const openGallery = () => {
    const options = {
      mediaType: 'photo', // or 'video', or 'mixed'
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('Image', response);
        const source = {uri: response.assets[0].uri};
        setSelectedImage(response.assets[0]);
        setModalVisible(false);
      }
    });
  };

  const OpenCamera = () => {
    const options = {
      mediaType: 'photo', // or 'video', or 'mixed'
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('Response', response);
        const source = {uri: response.assets[0].uri};
        setSelectedImage(response.assets[0]);
        setModalVisible(false);
      }
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (isEdit) {
              Alert.alert('Do you want to update', '', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () =>
                    dispatch(EditProfileSaga(userEditData, selectedImage)),
                },
              ]);
              // Save mode
              setIsEdit(false);
              console.log('The if');
            } else {
              // Edit mode
              console.log('ELse');
              setIsEdit(true);
            }
          }}
          style={{marginRight: 12}}>
          {isEdit ? (
            <Text style={{color: 'white', fontSize: 16}}>Save</Text>
          ) : (
            <Image
              source={require('../../../assets/images/dashboardIcon/edit.png')}
              style={{width: 60, height: 30, marginRight: 12}}
            />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, isEdit, userEditData, selectedImage]);

  useEffect(() => {
    if (editProfile.status == 200) {
      // dispatch(fetchProfile(editProfile?.data.user.id));
      if (user?.userId != null && user?.userId != undefined) {
        dispatch(fetchProfile(user?.userId));
        // dispatch(fetchNotifications(user?.userId));
      } else {
        dispatch(fetchProfile(user?.id));
        // dispatch(fetchNotifications(user?.id));
      }
    }
  }, [editProfile]);
  console.log('Selected', countryCode, userEditData.mobile);
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{width: '100%', height: '100%'}}>
          <LoadingAnimation />
        </View>
      ) : (
        <ScrollView style={styles.box}>
          <View>
            <TouchableOpacity
              disabled={!isEdit}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image
                source={{
                  uri:
                    selectedImage != null
                      ? selectedImage.uri
                      : data?.profile_picture_url,
                }}
                style={styles.imageStyle}
              />
            </TouchableOpacity>

            <Text style={styles.heading}>{data?.username}</Text>
            {!isEdit && (
              <>
                <View style={styles.lineContainer}>
                  <View style={styles.line}></View>
                  <Text style={styles.lineText}>{data?.email}</Text>
                  <View style={styles.line}></View>
                </View>
              </>
            )}
            {isEdit ? (
              <>
                <View style={styles.lineSeperate}></View>
                <View style={styles.inputBox}>
                  <View style={styles.inputBox1}>
                    <Text style={styles.lable}>Your Full name</Text>
                    <TextInput
                      style={styles.inputFeild}
                      value={userEditData?.username}
                      onChangeText={text => handleValue('username', text)}
                    />
                  </View>

                  <View style={styles.inputBox1}>
                    <Text style={styles.lable}>Email</Text>
                    <TextInput
                      style={styles.inputFeild}
                      value={userEditData?.email}
                      onChangeText={text => handleValue('email', text)}
                    />
                  </View>

                  {/* <View style={styles.inputBox1}>
                    <Text style={styles.lable}>Date of Birth</Text>
                    <TextInput style={styles.inputFeild} />
                  </View> */}

                  <View style={styles.phoneContainer}>
                    <Text style={styles.lable}>Phone Number</Text>
                    <PhoneInput
                      ref={phoneInputRef}
                      defaultValue={userEditData.mobile}
                      defaultCode={countryCode}
                      // defaultCode="IN"
                      // disableArrowIcon={true}
                      withFlag={true}
                      layout="first"
                      onChangeText={text => handleValue('mobile', text)}
                      withShadow
                      autoFocus={false}
                      value={userEditData.mobile}
                      containerStyle={[
                        styles.phoneInputContainer,
                        {height: 50},
                      ]}
                      textContainerStyle={[
                        styles.textInput,
                        {
                          height: '100%',
                          paddingVertical: 0,
                          // backgroundColor:'green',
                          borderRadius: 8,
                          color: '#888888',
                          // marginLeft:"-23%",
                          // position:'absolute'
                        },
                      ]}
                      textInputProps={{
                        style: {
                          fontSize: 16,
                          height: 40,
                          textAlignVertical: 'center',
                          paddingTop: 0,
                          paddingBottom: 0,
                          height: '100%',
                          color: '#888888',
                        },
                      }}
                    />
                  </View>
                </View>
                <View style={styles.lineSeperate}></View>
              </>
            ) : (
              <>
                <View
                  style={[
                    styles.contactStyles,
                    {width: '90%', margin: 'auto'},
                  ]}>
                  <View style={[styles.inputBox1, styles.input1]}>
                    <Text tyle={styles.lable}>Country Code</Text>
                    <Text style={[styles.inputFeilds, {padding: 12}]}>
                      {data?.mobile?.slice(0, 3)}{' '}
                    </Text>
                  </View>
                  <View style={[styles.inputBox1, styles.input2]}>
                    <Text tyle={styles.lable}>Phone number</Text>
                    <Text style={[styles.inputFeilds, {padding: 12}]}>
                      {data?.mobile?.slice(3)}{' '}
                    </Text>
                    {/* <Text style={styles.valueBox,Value}> {data.mobile}</Text> */}
                  </View>
                </View>
                <View style={styles.inputBox}>
                  <View style={styles.valueBox}>
                    <Text style={styles.valueBoxLable}>Date Of Birth:</Text>
                    <Text style={styles.valueBoxValue}> Missing</Text>
                  </View>
                </View>
              </>
            )}

            {isEdit ? (
              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Image source={Admin} />
                  <Text>System Role :</Text>
                  <Text style={{color: '#555555'}}>
                    {data?.role == '1' ? 'Admin' : 'Employee'}{' '}
                  </Text>
                  <Image source={Right} style={styles.right} />
                </View>

                <View style={styles.card}>
                  <Image source={Web} />
                  <Text>Time Zone :</Text>
                  <Text style={{color: '#555555'}}>Europe/ Malta </Text>
                  <Image source={Right} style={styles.right} />
                </View>
              </View>
            ) : (
              <View style={styles.cardContainer}>
                <View style={[styles.card, styles.changeBorderColor]}>
                  <Text>System Role :</Text>
                  <Text style={{color: '#555555'}}>
                    {' '}
                    {data?.role == '1' ? 'Admin' : 'Employee'}{' '}
                  </Text>
                  <Image source={Admin1} style={styles.right} />
                </View>

                <View style={[styles.card, styles.changeBorderColor]}>
                  <Text>Time Zone :</Text>
                  <Text style={{color: '#555555'}}>Europe/ Malta </Text>
                  <Image source={Web1} style={styles.right} />
                </View>
              </View>
            )}

            <View style={styles.cardBox}>
              <TouchableOpacity
                style={styles.cardBox1}
                onPress={() => setShowModal(true)}>
                <Text style={{fontWeight: 600}}>Location: </Text>
                <Text style={{color: '#555555'}}>
                  {data?.locations?.length}{' '}
                </Text>
              </TouchableOpacity>
              {/* <View style={styles.cardBox1}>
                <Text style={{fontWeight: 600}}>Position: </Text>
                <Text style={{color: '#555555'}}>0 </Text>
              </View>
              <View style={styles.cardBox1}>
                <Text style={{fontWeight: 600}}>Group: </Text>
                <Text style={{color: '#555555'}}>0</Text>
              </View> */}
            </View>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {/* <Text style={[styles.modalText]}>Select photo from</Text> */}
                    <TouchableOpacity
                      onPress={() => {
                        OpenCamera();
                      }}>
                      <Text style={styles.modalText}>Take a photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        openGallery();
                      }}>
                      <Text style={styles.modalText}>Choose from library</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            {showModal && (
              <ModModalComponental
                data={data?.locations}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // marginTop:1,
    // flex:1,
  },
  box: {
    height: '98%',
  },
  imageStyle: {
    width: 164,
    height: 164,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 200,
    marginTop: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'center',
    marginTop: 8,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
    fontSize: 16,
    color: '#555555',
    fontWeight: 400,
  },
  inputFeild: {
    borderWidth: 1,
    borderColor: '#C7C7C7',
    color: '#888888',
    fontSize: 14,
    fontWeight: 400,
    marginTop: 6,
    borderRadius: 8,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inputFeilds: {
    borderWidth: 1,
    borderColor: '#C7C7C7',
    color: '#888888',
    fontSize: 14,
    fontWeight: 400,
    marginTop: 6,
    borderRadius: 8,
    flex: 1,
  },
  lable: {
    fontSize: 12,
    fontWeight: 600,
    color: '#555555',
    marginTop: 12,
  },
  inputBox: {
    width: '90%',
    margin: 'auto',
    paddingVertical: 12,
  },
  inputBox1: {
    marginTop: 20,
  },
  input1: {
    width: '35%',
  },
  input2: {
    width: '60%',
  },
  contactStyles: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  lineSeperate: {
    height: 8,
    backgroundColor: '#ECEBEB',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12,
    borderWidth: 2,
    borderColor: '#01417B',
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
    gap: 10,
    alignItems: 'center',
    position: 'relative',
  },
  cardContainer: {
    width: '90%',
    margin: 'auto',
  },
  right: {
    position: 'absolute',
    right: 10,
  },
  cardBox: {
    width: '90%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  cardBox1: {
    display: 'flex',
    flexDirection: 'row',
    padding: 14,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
    position: 'relative',
    width: '32%',
  },
  valueBox: {
    borderWidth: 1,
    borderColor: '#C7C7C7',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 8,
  },
  valueBoxLable: {
    fontSize: 12,
    fontWeight: 600,
    color: '#555555',
  },
  valueBoxValue: {
    fontSize: 12,
    fontWeight: 600,
    color: '#888888',
  },
  changeBorderColor: {
    borderColor: '#C7C7C7',
  },
  phoneContainer: {
    marginTop: 10,
    width: '100%',
  },
  phoneInputContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#C7C7C7',
    borderRadius: 8,
    marginVertical: 10,
    color: '#888888',
    // height:50
  },
  textInput: {
    backgroundColor: '#ffffff',
    color: '#888888',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    // padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '70%',
  },
  modalText: {
    fontSize: 17,
    borderBottomWidth: 2,
    paddingVertical: 10,
    textAlign: 'center',
  },
});
