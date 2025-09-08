import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {addComment, fetchComment} from '../../../../actions/newsfeedAction';
import {formatDateTime} from '../../../../utils/constant';
const Eyes = require('../../../../assets/images/icon/eyes.png');
const Like1 = require('../../../../assets/images/icon/like1.png');
const Comment1 = require('../../../../assets/images/icon/comment1.png');
const Like = require('../../../../assets/images/icon/like.png');
const Comment = require('../../../../assets/images/icon/comment.png');
const Pin = require('../../../../assets/images/icon/pin.png');

export default function NewFeedPage({route}) {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();
  const [newsFeedData, setNewsFeedData] = useState(
    route.params?.newsData || null,
  );
  //
  const {commentList, like} = useSelector(state => state.newsFeed);

  const isKeyboardOpen = Keyboard.isVisible();
  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
    };
  }, [navigation]);

  const addTheComment = () => {
    console.log('inputValue', inputValue, newsFeedData?.id);
    if (inputValue.trim() === '') {
      return;
    }
    dispatch(addComment(inputValue, newsFeedData?.id));
    setInputValue('');
  };

  const fetchTheComment = () => {
    dispatch(fetchComment(newsFeedData?.id));
  };
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

  useEffect(() => {
    fetchTheComment();
  }, []);

  const Card = ({item}) => {
    return (
      <>
        <View
          style={{
            margin: 10,
            paddingBottom: 10,
            backgroundColor: '#FFFFFF',
          }}>
          <View style={styles.box}>
            <View style={styles.left}>
              {item?.profilePictureUrl ? (
                <Image
                  // source={{
                  //   uri: 'https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg',
                  // }}
                  source={{
                    uri: item?.profilePictureUrl,
                  }}
                  style={styles.imageStyle}
                />
              ) : (
                <View
                  style={[
                    styles.imageStyle,
                    {
                      backgroundColor: '#ecebebad',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 50,
                      width: 44,
                      height: 44,
                    },
                  ]}>
                  {/* <Text>{item.commented_by?.split(' ')}</Text> */}
                  <Text>
                    {item.commented_by
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase())
                      .join('')}
                  </Text>
                </View>
              )}

              <View>
                <Text style={styles.lable}>{item?.commented_by}</Text>
                <Text style={styles.lable}>{item?.comment}</Text>
              </View>
            </View>
            <View style={{height: '100%'}}>
              <Text style={styles.value}>
                {formatDateTime(item?.created_at)}
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.value}>{item?.content}</Text>
          </View>
          {/* <View style={styles.line}></View> */}
        </View>
        {/* <Text>dsjndsjnsjn</Text> */}
      </>
    );
  };

  console.log('isKeyboardOpen', commentList);
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
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={styles.left}>
              <Image
                // source={{
                //   uri: 'https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg',
                // }}

                source={{
                  uri: newsFeedData?.profilePictureUrl,
                }}
                style={styles.imageStyle}
              />
              <View>
                <Text style={styles.lable}>{newsFeedData?.username}</Text>
                <Text style={styles.value}>Demo Conversation</Text>
              </View>
            </View>
            <View style={{height: '100%'}}>
              <Text style={styles.value}>
                {formatDateTime(newsFeedData?.created_at)}
              </Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.card}>
            <Text style={styles.value}>{newsFeedData?.content}</Text>
            <View style={styles.box1}>
              <View style={styles.left}>
                <View style={styles.iconBox}>
                  <Image source={Like1} style={{width: 16, height: 16}} />
                  <Text style={styles.value}>{newsFeedData?.total_likes}</Text>
                </View>
                <View style={styles.iconBox}>
                  <Image source={Comment1} style={{width: 16, height: 16}} />
                  <Text style={styles.value}>
                    {newsFeedData?.total_comments}
                  </Text>
                </View>
              </View>
              <View style={styles.right}>
                <Text style={styles.value}>
                  <Image source={Eyes} style={{width: 16, height: 9}} />
                  0/0
                </Text>
              </View>
            </View>
            <View style={styles.thinLine}></View>
            <View style={styles.box1}>
              <View style={styles.left}>
                <View style={styles.iconBox}>
                  <Image source={Like} style={{width: 16, height: 16}} />
                  <Text style={styles.value}>Likes</Text>
                </View>
                <View style={styles.iconBox}>
                  <Image source={Comment} style={{width: 20, height: 16}} />
                  <Text style={styles.value}>Comments</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomSendMessage}>
            <View style={styles.messageBox}>
              <Image source={Pin} style={styles.iconStyle} />
              <TextInput
                placeholder="Write a comment"
                style={styles.inputStyle}
                placeholderTextColor="#555555"
                value={inputValue}
                onChangeText={setInputValue}
              />
            </View>
            <TouchableOpacity onPress={addTheComment}>
              <Text>Post</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {commentList?.comments?.length > 0 &&
              commentList?.comments?.map(item => (
                <Card item={item} key={item.id} />
                // <View key={item.id}>
                //   <Text>dsjnjn</Text>
                // </View>
              ))}
          </ScrollView>
        </View>
      </ScrollView>
      {/* <FlatList
        data={commentList?.comments}
        renderItem={({item}) => <Card item={item} />}
        keyExtractor={i => i.id}
        contentContainerStyle={{paddingBottom: 20}}
      /> */}
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingBottom: 80,
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    marginHorizontal: 'auto',
    paddingTop: 16,
  },
  imageStyle: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  lable: {
    fontSize: 12,
    fontWeight: 700,
    color: '#01417B',
  },
  value: {
    fontSize: 12,
    fontWeight: 400,
    color: '#555555',
  },
  line: {
    height: 8,
    backgroundColor: '#ECEBEB',
    borderColor: '#0000001F',
    borderWidth: 1,
  },
  card: {
    width: '95%',
    // marginTop: 8,
    marginHorizontal: 'auto',
  },
  box1: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  iconBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  thinLine: {
    height: 1,
    backgroundColor: '#C7C7C7',
    marginTop: 8,
  },
  bottomSendMessage: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputStyle: {
    flex: 1,
    fontSize: 12,
    fontWeight: 400,
    color: '#555555',
  },
  messageBox: {
    backgroundColor: '#ECEBEB',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  sendStyle: {
    fontSize: 12,
    fontWeight: 400,
    color: '#555555',
  },
  iconStyle: {
    width: 12,
    height: 18,
  },
});
