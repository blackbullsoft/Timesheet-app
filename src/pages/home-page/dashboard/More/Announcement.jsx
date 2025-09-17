import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {fetchAnnouncedUserSaga} from '../../../../actions/announcementsAction';
import {useDispatch, useSelector} from 'react-redux';
const Right = require('../../../../assets/images/icon/right.png');
const Coworker = require('../../../../assets/images/more/coworker.png');
const Eyes = require('../../../../assets/images/icon/eyes.png');
export default function Announcement({route}) {
  const dispatch = useDispatch();

  const {announcedUser} = useSelector(state => state.announcements);

  const {title, des, id} = route.params;
  useEffect(() => {
    dispatch(fetchAnnouncedUserSaga(id));
  }, []);
  console.log('announcedUser', announcedUser);

  console.log('ID', id);
  return (
    <View>
      <View style={styles.card}>
        <View style={styles.left}>
          <Image
            source={{
              uri: 'https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg',
            }}
            style={{width: 44, height: 44, borderRadius: 50}}
          />
          <Text style={styles.lable}>{title}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.value}>Jan 3, 2023</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={{marginVertical: 24}}>
        <Text style={styles.heading}>Recipients</Text>
        <View style={styles.box}>
          <View style={styles.left}>
            <View style={styles.imageCard}>
              <Image source={Coworker} style={{width: 25, height: 33}} />
            </View>
            <Text>341 Employees</Text>
          </View>
          <View style={styles.right}></View>
          <Image source={Right} />
        </View>
      </View>
      <View style={styles.line}></View>

      <Text style={styles.largeHeading}>{title}</Text>
      <View style={styles.box1}>
        <Text style={styles.lable1}>{des}</Text>
        <Text style={styles.value1}>
          <Image source={Eyes} />
          0/0
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  line: {
    height: 8,
    backgroundColor: '#ECEBEB',
  },
  imageCard: {
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: '#0085FE',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    margin: 'auto',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#01417B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  heading: {
    fontSize: 12,
    fontWeight: 600,
    color: '#555555',
    paddingLeft: 12,
  },
  largeHeading: {
    fontSize: 24,
    fontWeight: 600,
    color: '#0085FE',
    paddingTop: 24,
    paddingLeft: 12,
  },
  box1: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
  },
  lable1: {
    fontSize: 12,
    fontWeight: 400,
    color: '#888888',
    width: '80%',
  },
  value1: {
    fontSize: 12,
    fontWeight: 400,
    color: '#888888',
    width: '20%',
  },
});
