import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  RefreshControl,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import NewFeedPage from './NewsFeeds/NewFeedPage';
import {useDispatch, useSelector} from 'react-redux';
import {likeAndDislike, newsFeedList} from '../../../actions/newsfeedAction';
import LoadingAnimation from '../../../component/Loader';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {formatDateTime} from '../../../utils/constant';
const calender = require('../../../assets/images/dashboardIcon/newsfeed11.png');
const Eyes = require('../../../assets/images/icon/eyes.png');
const Like1 = require('../../../assets/images/icon/like1.png');
const Comment1 = require('../../../assets/images/icon/comment1.png');
const Like = require('../../../assets/images/icon/like.png');
const Comment = require('../../../assets/images/icon/comment.png');
const Pin = require('../../../../assets/images/icon/pin.png');
export default function Newsfeed() {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);
  const [newsFeedDataList, setNewsFeedDataList] = React.useState([]);
  const {newsFeedData, loading, like} = useSelector(state => state.newsFeed);
  const [newsFeedTheId, setNewsFeedTheId] = React.useState(null);

  const getNewsFeedData = () => {
    dispatch(newsFeedList());
  };
  useEffect(() => {
    getNewsFeedData();
  }, []);

  // useEffect(() => {
  //   if (newsFeedData?.feeds.length > 0) {
  //     setNewsFeedDataList(newsFeedData?.feeds);
  //   }
  // }, [newsFeedData]);

  const likeDislike = newsFeedId => {
    setNewsFeedTheId(newsFeedId);
    // console.log('newsFeedId', newsFeedId);
    dispatch(likeAndDislike(newsFeedId));
  };

  const handleLike = () => {
    console.log('handleLike', like, newsFeedTheId, newsFeedDataList);
    if (like != null && newsFeedTheId != null) {
      const updatedData = newsFeedDataList.map(item => {
        if (item.id === newsFeedTheId) {
          const newIsLiked = item.is_liked === 1 ? 0 : 1; // toggle like
          return {
            ...item,
            is_liked: newIsLiked,
            total_likes:
              newIsLiked === 1
                ? item.total_likes + 1
                : Math.max(item.total_likes - 1, 0), // prevent negative
          };
        }
        return item;
      });

      console.log('Updated afterLike ', updatedData);
      setNewsFeedDataList(updatedData); // update state so UI rerenders
    }
  };

  useEffect(() => {
    // handleLike();
  }, [like]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNewsFeedData();
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 2000);
  }, []);

  useEffect(() => {
    if (!loading) {
      setRefreshing(false);
    }
  }, [loading]);
  // console.log('newsFeed all list', newsFeedData);
  // console.log('like', like);
  // const formatDateTime = dateString => {
  //   const date = moment(dateString);

  //   if (date.isSame(moment(), 'day')) {
  //     // If it's today → show only time
  //     return date.format('hh:mm A');
  //   } else {
  //     // If it's not today → show date + time
  //     return date.format('DD-MM-YYYY hh:mm A');
  //   }
  // };
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
              {item?.profilePicture?.content ? (
                <Image
                  // source={{
                  //   uri: 'https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg',
                  // }}
                  // source={{
                  //   uri: item?.profilePictureUrl,
                  // }}
                  source={{
                    uri: `data:image/jpeg;base64,${item?.profilePicture?.content}`,
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
                    {item.username
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase())
                      .join('')}
                  </Text>
                </View>
              )}
              {/* <Image
                // source={{
                //   uri: 'https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg',
                // }}
                // source={{
                //   uri: item?.profilePictureUrl,
                // }}
                source={{
                  uri: `data:image/jpeg;base64,${item?.profilePicture?.content}`,
                }}
                style={styles.imageStyle}
              /> */}
              <View>
                <Text style={styles.lable}>{item?.username}</Text>
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
            <View style={styles.box1}>
              <View style={styles.left}>
                <View style={styles.iconBox}>
                  <Image source={Like} style={{width: 16, height: 16}} />
                  <Text style={styles.value}>{item?.total_likes}</Text>
                </View>
                <View style={styles.iconBox}>
                  <Image source={Comment1} style={{width: 16, height: 16}} />
                  <Text style={styles.value}>{item?.total_comments}</Text>
                </View>
              </View>
              {/* <View style={styles.right}>
                <Text style={styles.value}>
                  <Image source={Eyes} style={{width: 16, height: 9}} />
                  0/0
                </Text>
              </View> */}
            </View>
            <View style={styles.thinLine}></View>
            <View style={styles.box1}>
              <View style={styles.left}>
                <TouchableOpacity
                  style={styles.iconBox}
                  onPress={() => likeDislike(item.id)}>
                  <Image
                    source={item?.is_liked == '1' ? Like1 : Like}
                    style={{width: 16, height: 16}}
                  />
                  <Text style={styles.value}>Likes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('NewsfeedPage', {newsData: item});
                  }}
                  style={styles.iconBox}>
                  <Image source={Comment} style={{width: 20, height: 16}} />
                  <Text style={styles.value}>Comments</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <View style={styles.line}></View> */}
        </View>
        {/* <Text>dsjndsjnsjn</Text> */}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {!loading && newsFeedData?.feeds?.length === 0 && (
        <View style={styles.container}>
          <Image source={calender} />
          <Text style={styles.heading}>No News Feed</Text>
          <Text style={styles.subHeading}>
            You don't have any news feed right now
          </Text>
        </View>
      )}
      {/* <NewFeedPage /> */}
      {loading ? (
        <View style={{width: '100%', height: '100%'}}>
          <LoadingAnimation />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={newsFeedData?.feeds}
          renderItem={({item}) => <Card item={item} />}
          keyExtractor={i => i.id}
          contentContainerStyle={{paddingBottom: 20}}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // container: {
  //   width: '100%',
  //   height: '100%',
  //   paddingBottom: 80,
  // },
  heading: {
    fontSize: 20,
    fontWeight: 600,
    color: '#000000',
    marginTop: 12,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: 400,
    color: '#555555',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 8,
    width: '80%',
    marginHorizontal: 'auto',
  },
  btnContainer: {
    width: '80%',
    backgroundColor: '#0085FE',
    borderRadius: 8,
    marginTop: 20,
  },
  btn: {
    color: '#ffffff',
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: 600,
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    marginHorizontal: 'auto',
    paddingVertical: 16,
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
    marginVertical: 10,
  },
  card: {
    width: '95%',
    marginTop: 8,
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
