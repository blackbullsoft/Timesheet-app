import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
const Eyes = require('../../../../assets/images/icon/eyes.png');
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAnnouncedUserSaga,
  fetchAnnouncementsList,
} from '../../../../actions/announcementsAction';
import LoadingAnimation from '../../../../component/Loader';
import {formatDateTime} from '../../../../utils/constant';

export default function AnnouncementList() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch();
  const {announcements, loading, announcedUser} = useSelector(
    state => state.announcements,
  );
  useEffect(() => {
    dispatch(fetchAnnouncementsList());
  }, []);
  const getAnnouncedUser = id => {
    dispatch(fetchAnnouncedUserSaga(id));
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchAnnouncementsList());
    }, [dispatch]),
  );
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchAnnouncementsList());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AnnouncementCreate')}>
          <Image
            source={require('../../../../assets/images/icon/add.png')}
            style={{width: 18, height: 18, marginRight: 12}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const Card = item => {
    return (
      <Pressable
        style={styles.card}
        // onPress={() =>
        //   navigation.navigate('Announcement', {
        //     title: item?.item?.events,
        //     des: item?.item?.description,
        //     id: item?.item?.id,
        //   })

        // }
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            source={{
              uri: item.item.profile_picture_url,
            }}
            style={styles.profileStyle}
          />
          <View
            style={{
              marginLeft: 12,
            }}>
            <Text style={styles.value}>{item?.item?.owner_name}</Text>
            <Text style={styles.value}>
              {formatDateTime(item.item.created_at)}
            </Text>
          </View>
        </View>

        <View style={styles.left}>
          <Text style={styles.lable}>{item?.item?.content}</Text>
        </View>

        <TouchableOpacity
          style={styles.annoucedContainer}
          onPress={() => {
            getAnnouncedUser(item.item.id);
            setModalVisible(true);
          }}>
          <Text style={styles.modalText}>
            {item?.item?.total_announced_users} Employees Announced
          </Text>
        </TouchableOpacity>
        {/* <View style={styles.right}>
        <Text style={styles.value}>
          <Image source={Eyes} style={{width: 16, height: 9}} />
          0/0
        </Text>
        <Text style={styles.value}>Jan 5, 2022</Text>
      </View> */}
      </Pressable>
    );
  };
  console.log('announcements', announcements, announcedUser);
  return (
    //    <ScrollView>
    // {
    //     loading?<LoadingAnimation />:
    //     <FlatList
    //     data={announcements}
    //     renderItem={({item})=><Card item={item} />}
    //     keyExtractor={(item) => item.id.toString()}

    //     />
    // }

    //    </ScrollView>
    <>
      {loading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        <>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={announcements}
            renderItem={({item}) => <Card item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </>
      )}

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
              {announcedUser?.map((data, index) => (
                <View key={index}>
                  <Text style={styles.insideModalText}>{data?.username}</Text>
                  <Text style={styles.emailModalText}>{data?.email}</Text>
                </View>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginHorizontal: 'auto',
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: '#E5E5E5',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  left: {},
  right: {
    alignItems: 'flex-end',
  },
  lable: {
    fontSize: 12,
    fontWeight: 700,
    color: '#555555',
  },
  value: {
    fontSize: 13,
    fontWeight: 500,
    color: '#888888',
  },
  profileStyle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ffffff',
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
    fontSize: 13,
    // borderBottomWidth: 2,
    // paddingVertical: 10,
    textAlign: 'center',
    color: '#01417B',
  },

  annoucedContainer: {
    // backgroundColor: 'white',
    borderWidth: 1.5,
    borderRadius: 3,
    borderColor: '#0085FE',
    paddingVertical: 10,
    width: '50%',
    marginTop: 10,
  },

  insideModalText: {
    fontSize: 13,

    paddingLeft: 10,
    color: 'black',
    fontWeight: '600',
  },
  emailModalText: {
    fontSize: 12,
    borderBottomWidth: 0.5,

    paddingLeft: 10,
    color: 'black',
    fontWeight: '400',
    paddingTop: 2,
    paddingBottom: 10,
  },
});
