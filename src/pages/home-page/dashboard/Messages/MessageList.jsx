import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NoMessage from './NoMessage';
import LoadingAnimation from '../../../../component/Loader';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {chatList} from '../../../../actions/chatAction';
const SearchIcon = require('../../../../assets/images/icon/search.png');

const data = [
  {
    name: 'Vinay',
    img: '',
    reply: 'You',
    message: 'do it',
    id: 1,
    min: 23,
    count: 1,
  },
  {
    name: 'Adam',
    img: '',
    reply: 'Vinay',
    message: 'what it is?',
    id: 2,
  },
  {
    name: 'Vijay',
    img: '',
    reply: 'You',
    message: 'do it',
    id: 3,
  },
];

const Card = item => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.card}
      onPress={
        () => navigation.navigate('Message', {conversationData: item})
        // console.log('item', item?.item?.participants[1]?.username)
      }>
      <View style={styles.left}>
        <Image
          source={{
            uri: 'https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg',
          }}
          style={{width: 44, height: 44, borderRadius: 50}}
        />
        <View>
          <Text style={styles.lable}>
            {item?.item?.participants[1]?.username}
          </Text>
          <Text style={styles.value}>{item?.item?.last_message}</Text>
        </View>
      </View>
      {item?.item?.min && (
        <View style={styles.right}>
          <Text style={styles.value}>{item?.item?.min} min</Text>
          <View style={styles.circle}>
            <Text style={styles.countStyle}>{item?.item?.count}</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};
export default function MessageList() {
  const dispatch = useDispatch();
  const [chatData, setChatData] = useState([]);
  // const {chat} = useSelector(state => state.chat);
  const {chatList: chats, loading, error} = useSelector(state => state.chat);

  const [conversations, setConversations] = useState([]);
  // const loading = false;

  const getChatList = () => {
    const respone = dispatch(chatList());
    console.log('chat list', chats);
  };

  const searchUser = text => {
    const filterData = chats.filter(item =>
      item.participants[1]?.username.toLowerCase().includes(text.toLowerCase()),
    );
    setChatData(filterData);
    console.log('filterData', filterData);
  };
  // const { coworkers,loading } = useSelector((state) => state.coworkers);
  // useEffect(() => {
  //   getChatList();

  //   // dispatch(fetchCoworkersList())
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(chatList());
    }, [dispatch]),
  );

  useEffect(() => {
    if (chats) {
      setChatData(chats);
    }
  }, [chats]);
  console.log('chatData', chatData);
  return (
    <View>
      <View style={styles.overlapBox}>
        <Image source={SearchIcon} style={styles.iconStyle} />
        <TextInput
          placeholder="Quickly find a conversation..."
          style={styles.inputStyle}
          placeholderTextColor="#555555"
          onChangeText={text => searchUser(text)}
        />
      </View>
      {loading ? (
        <View style={{width: '100%', height: '100%'}}>
          <LoadingAnimation />
        </View>
      ) : (
        <>
          {data.length == 0 ? (
            <NoMessage />
          ) : (
            <View style={{marginTop: 22}}>
              <FlatList
                data={chatData}
                renderItem={({item}) => <Card item={item} />}
                keyExtractor={item => item.conversation_id.toString()}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  overlapBox: {
    width: '80%',
    margin: 'auto',
    color: '#888888',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: -20,
    zIndex: 99,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    gap: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  inputStyle: {
    fontSize: 12,
    fontWeight: 400,
    color: '#555555',
    flex: 1,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  imageStyle: {
    width: 40,
    height: 60,
  },
  circle: {
    backgroundColor: '#01417B',
    width: 16,
    height: 16,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: '#000000',
    textAlign: 'center',
    marginTop: 8,
  },
  line: {
    height: 8,
    backgroundColor: '#ECEBEB',
    marginTop: 12,
  },
  card: {
    width: '100%',
    marginHorizontal: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingHorizontal: 12,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  lable: {
    fontSize: 12,
    fontWeight: 700,
    color: '#01417B',
  },
  value: {
    fontSize: 12,
    fontWeight: 600,
    color: '#555555',
  },
  countStyle: {
    fontSize: 10,
    fontWeight: 400,
    color: '#ffffff',
  },
  right: {
    alignItems: 'center',
  },
});
