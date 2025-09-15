import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCoworkersList} from '../../../../actions/coworkerAction';
import LoadingAnimation from '../../../../component/Loader';
const SearchIcon = require('../../../../assets/images/icon/search.png');
const Coworker = require('../../../../assets/images/more/coworker.png');
const Right = require('../../../../assets/images/icon/right.png');

const Card = item => {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Image
          source={{
            uri: 'https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg',
          }}
          style={{width: 44, height: 44, borderRadius: 50}}
        />
        <Text>{item?.item?.username}</Text>
      </View>
      <Image source={Right} style={{width: 10, height: 15}} />
    </View>
  );
};
export default function Coworkers() {
  const dispatch = useDispatch();
  const {coworkers, loading} = useSelector(state => state.coworkers);
  useEffect(() => {
    dispatch(fetchCoworkersList());
  }, []);
  return (
    <View>
      <View style={styles.overlapBox}>
        <Image source={SearchIcon} style={styles.iconStyle} />
        <TextInput
          placeholder="Find your coworker.."
          style={styles.inputStyle}
          placeholderTextColor="#555555"
        />
      </View>
      {loading ? (
        <View style={{width: '100%', height: '100%'}}>
          <LoadingAnimation />
        </View>
      ) : (
        <>
          <View style={styles.circle}>
            <Image source={Coworker} style={styles.imageStyle} />
          </View>
          <Text style={styles.heading}>{coworkers.length} Coworkers</Text>
          <View style={styles.line}></View>

          <FlatList
            data={coworkers}
            renderItem={({item}) => <Card item={item} />}
            keyExtractor={item => item.id.toString()}
          />
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
    width: 80,
    height: 80,
    borderRadius: 200,
    backgroundColor: '#76CDF3',
    borderWidth: 2,
    borderColor: '#01417B',
    borderRadius: 200,
    alignSelf: 'center',
    marginTop: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 80,
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
    borderBottomWidth: 0.2,
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
  nameStyle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#555555',
  },
});
