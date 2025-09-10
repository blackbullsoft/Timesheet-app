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
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/Entypo';
const Pin = require('../../../../assets/images/icon/pin.png');
import {launchImageLibrary} from 'react-native-image-picker';

const AddNewsFeed = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
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
  const data = [
    {label: 'Check page', value: '1'},
    {label: 'Demo Conversation', value: '2'},
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
        const source = {uri: response.assets[0].uri};
        setSelectedImage(source);
      }
    });
  };

  const AddPost = () => {
    const formdata = new FormData();
    formdata.append(
      'content',
      'Just a simple text post without any media files!',
    );

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI2NywidXNlcm5hbWUiOiJDaGFybHRvbiBTY2ljbHVuYSIsInJvbGUiOiIxIiwiZW1haWwiOiJjaGFybHRvbkBlcHNtYWx0YS5jb20iLCJzdGF0dXMiOiIxIiwiaWF0IjoxNzU3NDg3NTU0LCJleHAiOjE3NTc1NzM5NTR9.eW4P7cPE2S6hJzAAAzJTy9fN6AfmA4JJLf6gm7lgLEQ',
        // ⚠️ Don't set Content-Type, fetch will do it automatically for FormData
      },
      body: JSON.stringify({
        content: 'Just a simple text post without any media files!',
      }),
    };

    fetch('http://174.138.57.202:8000/newsfeed/post', requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error));
  };
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
          <Dropdown
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
          />
          <TextInput
            placeholder="Share Something..."
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
          <TouchableOpacity
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
          </TouchableOpacity>
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
