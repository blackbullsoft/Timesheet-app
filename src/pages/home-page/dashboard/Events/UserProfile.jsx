import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Linking,
  TurboModuleRegistry,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfile} from '../../../actions/profileAction';
import LoadingAnimation from '../../../../component/Loader';
import {fetchUserProfile} from '../../../../actions/userProfileAction';
import ModModalComponental from '../../../../component/ModalComponent';
const Call = require('../../../../assets/images/profile/call.png');
const Email = require('../../../../assets/images/profile/email.png');
const Message = require('../../../../assets/images/profile/message.png');
const Admin1 = require('../../../../assets/images/icon/admin1.png');
const Web1 = require('../../../../assets/images/icon/web1.png');

export default function UserProfile({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const employeeId = route?.params?.employeeId;
  const employeeData = route?.params?.data;
  const [showModal, setShowModal] = useState(false);

  const {data, loading} = useSelector(state => state.userProfile);
  const handleCallPress = () => {
    Linking.openURL(`tel:${data?.mobile}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${data?.email}`);
  };
  const handleMessagePress = () => {
    Linking.openURL(`sms:${data?.mobile}`);
  };
  useEffect(() => {
    if (employeeId) {
      dispatch(fetchUserProfile(employeeId));
    }
  }, [employeeId]);

  // console.log('employeeData', employeeData);
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{width: '100%', height: '100%'}}>
          <LoadingAnimation />
        </View>
      ) : (
        <ScrollView style={styles.box}>
          <View>
            <Image
              source={{
                uri: 'https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg',
              }}
              style={styles.imageStyle}
            />
            <Text style={styles.heading}>{data?.username}</Text>

            <View style={styles.lineContainer}>
              <View style={styles.line}></View>
              <Text style={styles.lineText}>{data?.email}</Text>
              <View style={styles.line}></View>
            </View>

            <View style={styles.containerY}>
              <View style={styles.containerB}>
                <TouchableOpacity style={styles.box1} onPress={handleCallPress}>
                  <Image source={Call} style={{width: 24, height: 24}} />
                  <Text style={styles.iconText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.box1}
                  onPress={handleMessagePress}>
                  <Image source={Message} style={{width: 28, height: 24}} />
                  <Text style={styles.iconText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.box1}
                  onPress={handleEmailPress}>
                  <Image source={Email} style={{width: 30, height: 22}} />
                  <Text style={styles.iconText}>Email</Text>
                </TouchableOpacity>
                <View></View>
              </View>
            </View>
            <View
              style={[styles.contactStyles, {width: '90%', margin: 'auto'}]}>
              <View style={[styles.inputBox1, styles.input1]}>
                <Text tyle={styles.lable}>Country Code</Text>
                <Text style={[styles.inputFeild, {padding: 12}]}>
                  {data?.mobile?.slice(0, 3)}{' '}
                </Text>
              </View>
              <View style={[styles.inputBox1, styles.input2]}>
                <Text tyle={styles.lable}>Phone number</Text>
                <Text style={[styles.inputFeild, {padding: 12}]}>
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

            <View style={styles.cardBox}>
              <TouchableOpacity
                style={styles.cardBox1}
                onPress={() => setShowModal(true)}>
                <Text style={{fontWeight: 600}}>Location: </Text>
                <Text style={{color: '#555555'}}>
                  {employeeData ? employeeData?.locations?.length : '0'}{' '}
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
          </View>

          {/* Modal */}
          {showModal && (
            <ModModalComponental
              data={employeeData?.locations}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
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
    fontSize: 12,
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
  containerY: {
    width: '90%',
    backgroundColor: '#FECA36',
    borderRadius: 8,
    marginHorizontal: 'auto',
  },
  containerB: {
    width: '90%',
    marginHorizontal: 'auto',
    backgroundColor: '#004079',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-around',
  },
  icon: {
    width: 30,
    height: 22,
  },
  iconText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#0085FE',
    textAlign: 'center',
  },
  box1: {
    display: 'flex',
    alignItems: 'center',
    width: '30%',
  },
});
