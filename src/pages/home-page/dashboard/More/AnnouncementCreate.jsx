import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserList from '../Messages/UserList';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../../../actions/toastAction';
import {
  clearAnnouncement,
  createAnnoucement,
} from '../../../../actions/announcementsAction';
import LoadingAnimation from '../../../../component/Loader';

const AnnouncementCreate = () => {
  const [announcementData, setAnnouncementData] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const {data} = useSelector(state => state.profile);

  const {announcements, annocementCreated, loading} = useSelector(
    state => state.announcements,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleData = (name, value) => {
    setAnnouncementData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const createTheAnnouncement = () => {
    console.log('announcementData', announcementData);
    if (!announcementData?.title || announcementData?.title == null) {
      dispatch(showToast('error', 'Title required'));
      console.log('announcementData?.title', announcementData);
    } else if (
      !announcementData?.description ||
      announcementData?.description == null
    ) {
      dispatch(showToast('error', 'Description Require'));
      console.log('announcementData?.Description', announcementData);
    } else if (announcementData.selectedUser?.length == 0) {
      console.log(
        'announcementData.selectedUser',
        announcementData.selectedUser,
      );
      dispatch(showToast('error', 'Select atleast announced user'));
    } else {
      console.log('Create announcement feature');
      //   handleData("selectedUser",)

      dispatch(createAnnoucement(announcementData, data.id));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => createTheAnnouncement()}>
          <Text style={{color: 'white', marginRight: 12}}>Create</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, announcementData, selectedUsers]);

  useEffect(() => {
    if (selectedUsers) {
      const id = selectedUsers?.map(data => data?.id);
      handleData('selectedUser', id);
      console.log('ALl id', id);
    }
  }, [selectedUsers]);

  useEffect(() => {
    if (data && selectedUsers?.length > 0) {
      handleData('selectedUser', data?.id);
    }
  }, [data]);

  useEffect(() => {
    if (annocementCreated) {
      if (annocementCreated?.status == 201) {
        navigation.goBack();
        dispatch(clearAnnouncement());
      }
    }
  }, [annocementCreated]);
  console.log('selectedUsers Announ', annocementCreated, announcementData);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <View style={{flex: 1}}>
          {/* First half - 40% */}
          <View style={{flex: 3}}>
            <ScrollView>
              <View style={styles.TextInputContainer}>
                <TextInput
                  placeholder="Title"
                  onChangeText={text => handleData('title', text)}
                  placeholderTextColor="#555555"
                  style={{
                    // marginBottom: 50,
                    paddingVertical: 10,
                    paddingHorizontal: 0,
                    textAlignVertical: 'top',
                    paddingHorizontal: 8,
                  }}
                />
              </View>

              <View style={styles.TextInputContainer}>
                <TextInput
                  placeholder="Description"
                  onChangeText={text => handleData('description', text)}
                  style={{
                    marginBottom: 50,
                    paddingVertical: 10,
                    paddingHorizontal: 0,
                    textAlignVertical: 'top',
                    paddingHorizontal: 8,
                  }}
                  placeholderTextColor="#555555"
                  multiline
                />
              </View>
            </ScrollView>
          </View>

          {/* Second half - 60% */}
          <View style={{flex: 7}}>
            <ScrollView
              style={{
                paddingTop: 25,
              }}>
              <UserList onSelectUsers={setSelectedUsers} />
            </ScrollView>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default AnnouncementCreate;

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
  TextInputContainer: {
    borderColor: '#C7C7C7',
    borderWidth: 1,
    // padding: 16,
    // margin: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 7,
  },
});
