import {
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/Entypo';
const Pin = require('../../../../assets/images/icon/pin.png');
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddFeed,
  clearNewsFeedResponse,
} from '../../../../actions/newsfeedAction';
import {showToast} from '../../../../actions/toastAction';
import {fetchUserProfile} from '../../../../actions/userProfileAction';

const AddNewsFeed = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();
  const [newsFeedText, setNewsFeedText] = useState('');
  const {addnewsFeedData} = useSelector(state => state.newsFeed);
  const {data, loading} = useSelector(state => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // const [value, setValue] = useState(null);
  // const [isFocus, setIsFocus] = useState(false);
  // const [selectedImage, setSelectedImage] = useState();

  const creatNewFeed = () => {
    if (!newsFeedText) {
      dispatch(showToast('error', 'Enter content', '.'));
    } else if (data.role == 1) {
      dispatch(AddFeed(newsFeedText));
    } else {
      dispatch(showToast('error', 'Only admin can post', '.'));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => creatNewFeed()}>
          <Text style={{color: 'white', marginRight: 12}}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, newsFeedText]);

  useEffect(() => {
    if (addnewsFeedData && addnewsFeedData.status == 201) {
      navigation.goBack();
      dispatch(clearNewsFeedResponse());
    }
  }, [addnewsFeedData]);

  console.log('addnewsFeedData', addnewsFeedData, data);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: keyboardVisible ? 100 : 0,
          //   backgroundColor: 'red',
          flex: 1,
        }}>
        <View
          style={{
            borderColor: '#C7C7C7',
            borderWidth: 1,
            padding: 16,
            margin: 20,
            borderRadius: 8,
          }}>
          {/* <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            //   search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Pages' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="triangle-right"
                size={20}
              />
            )}
          /> */}
          <TextInput
            placeholder="Share Something..."
            onChangeText={text => {
              console.log('Text', text);
              setNewsFeedText(text);
            }}
            //   style={styles.inputStyle}
            style={{
              //   marginTop: 20,
              marginTop: 20,
              height: 150,
              //   borderWidth: 1,
              //   borderColor: '#ccc',
              padding: 10,
              textAlignVertical: 'top',
            }}
            placeholderTextColor="#555555"
            // value={inputValue}
            numberOfLines={10}
            multiline={true}
            // onChangeText={setInputValue}
          />
          {/* <TouchableOpacity
            onPress={() => {
              // openGallery();
              AddPost();
            }}
            style={styles.AttachContainer}>
            <Image source={Pin} style={styles.iconStyle} />

            <Text
              style={{
                marginLeft: 10,
              }}>
              Add Attachment
            </Text>
          </TouchableOpacity> */}
        </View>
        {/* {renderLabel()} */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddNewsFeed;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
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
  //   iconStyle: {
  //     width: 20,
  //     height: 20,
  //   },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 12,
    height: 18,
  },
  AttachContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEBEB',
    padding: 10,
    borderRadius: 8,
  },
});
