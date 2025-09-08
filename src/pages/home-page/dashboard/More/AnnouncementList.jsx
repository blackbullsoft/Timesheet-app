import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
const Eyes = require('../../../../assets/images/icon/eyes.png');
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAnnouncementsList} from '../../../../actions/announcementsAction';
import LoadingAnimation from '../../../../component/Loader';

const Card = item => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate('Announcement', {
          title: item?.item?.events,
          des: item?.item?.description,
        })
      }>
      <View style={styles.left}>
        <Text style={styles.lable}>{item?.item?.events}</Text>
        <Text style={styles.value}>{item?.item?.description}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.value}>
          <Image source={Eyes} style={{width: 16, height: 9}} />
          0/0
        </Text>
        <Text style={styles.value}>Jan 5, 2022</Text>
      </View>
    </Pressable>
  );
};
export default function AnnouncementList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {announcements, loading} = useSelector(state => state.announcements);
  useEffect(() => {
    dispatch(fetchAnnouncementsList());
  }, []);
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
            data={announcements}
            renderItem={({item}) => <Card item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginHorizontal: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 12,
    fontWeight: 400,
    color: '#888888',
  },
});
