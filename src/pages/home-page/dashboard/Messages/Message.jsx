import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import React, {use, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearSentMessage,
  MessageList,
  Messages,
  sendMessage,
} from '../../../../actions/chatAction';
import moment from 'moment';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LoadingAnimation from '../../../../component/Loader';
const Pin = require('../../../../assets/images/icon/pin.png');

const data = [
  {
    msg: 'ok ',
    time: '1:00 pm',
    you: true,
    id: 1,
  },
  {
    msg: 'ok nnnssssssssssssssssssssssssok nnnssssssssssssssssssssssss',
    time: '1:00 pm',
    you: false,
    id: 2,
  },
  {
    msg: 'ok nnnssssssssssssssssssssssss',
    time: '1:00 pm',
    you: true,
    id: 3,
  },
  {
    msg: 'ok nnnssssssssssssssssssssssss',
    time: '1:00 pm',
    you: true,
    id: 4,
  },
  {
    msg: 'ok nnnssssssssssssssssssssssss',
    time: '1:00 pm',
    you: false,
    id: 5,
  },
  {
    msg: 'ok nnnssssssssssssssssssssssss',
    time: '1:00 pm',
    you: true,
    id: 6,
  },
  {
    msg: 'ok nnnssssssssssssssssssssssssok nnnssssssssssssssssssssssss',
    time: '1:00 pm',
    you: false,
    id: 7,
  },
  {
    msg: 'ok nnnssssssssssssssssssssssss',
    time: '1:00 pm',
    you: true,
    id: 8,
  },
  {
    msg: 'ok nnnssssssssssssssssssssssss',
    time: '1:00 pm',
    you: true,
    id: 9,
  },
  {
    msg: 'ok nnnssssssssssssssssssssssss',
    time: '1:00 pm',
    you: false,
    id: 10,
  },
  {
    msg: 'ok nnnssssssssssssssssssssssss',
    time: '1:00 pm',
    you: false,
    id: 11,
  },
];

export default function Message({route}) {
  const {conversationData} = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // 👈 gives safe area values
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.profile);
  const {
    loading,

    message,
    sentMessage,
  } = useSelector(state => state.chat);
  const [messageData, setMessageData] = useState([]);

  const getMessages = () => {
    dispatch(Messages(conversationData?.item?.conversation_id));
  };

  const sendUserMessage = () => {
    if (inputValue.trim() === '') {
      return; // Don't send empty messages
    }
    const messageData = {
      conversation_id: conversationData?.item?.conversation_id,
      sender_id: data?.userId,
      message: inputValue,
    };

    // console.log('messageData', messageData);
    dispatch(sendMessage(messageData));
    setInputValue(''); // Clear the input field after sending
  };
  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
    };
  }, [navigation]);
  useEffect(() => {
    getMessages();
    clearSentMessage();
  }, []);

  useEffect(() => {
    if (message?.length > 0) {
      setMessageData(message);
    }
  }, [message]);

  useEffect(() => {
    if (sentMessage != null) {
      setMessageData(prevMessages => [...prevMessages, sentMessage]);
    }
  }, [sentMessage]);

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

  const Card = ({item}) => {
    return (
      <>
        {item?.sender_id == data?.userId ? (
          <View style={[styles.card, styles.reverse]}>
            <Text style={[styles.message, styles.changeText]}>
              {item?.message}
            </Text>
            <Text style={styles.time}>
              {moment(item?.created_at).format('hh:mm A')}
            </Text>
          </View>
        ) : (
          <View style={[styles.card]}>
            <Text style={styles.message}>{item?.message}</Text>
            <Text style={styles.time}>
              {moment(item?.created_at).format('hh:mm A')}
            </Text>
          </View>
        )}
      </>
    );
  };

  console.log('userdata', sentMessage, loading);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // adjust if header is present
    >
      {loading ? (
        <View style={{width: '100%', height: '100%'}}>
          <LoadingAnimation />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={messageData}
            renderItem={({item}) => <Card item={item} />}
            keyExtractor={i => i.id}
            contentContainerStyle={{paddingBottom: 200}}
          />
          <View
            style={[
              styles.bottomSendMessage,
              {
                bottom: keyboardVisible
                  ? insets.bottom + 120
                  : insets.bottom + 20,
              },
            ]}>
            <View style={styles.messageBox}>
              <Image source={Pin} style={styles.iconStyle} />
              <TextInput
                placeholder="Start a conversation..."
                style={styles.inputStyle}
                placeholderTextColor="#555555"
                value={inputValue}
                onChangeText={setInputValue}
              />
            </View>
            <Pressable
              onPress={() => {
                console.log('send message');
                sendUserMessage();
              }}>
              <Text>Send</Text>
            </Pressable>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingBottom: 80,
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
  card: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'center',
    marginTop: 16,
  },
  message: {
    width: '75%',
    backgroundColor: '#01417B',
    fontSize: 12,
    fontWeight: 400,
    color: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 0,
  },
  time: {
    fontSize: 12,
    fontWeight: 400,
    color: '#888888',
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  changeText: {
    backgroundColor: '#ECEBEB',
    color: '#000000',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 0,
  },
  iconStyle: {
    width: 12,
    height: 18,
  },
});
