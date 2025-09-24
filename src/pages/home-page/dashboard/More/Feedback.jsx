import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {sendFeedback} from '../../../../actions/feedbackAction';
const Feedback1 = require('../../../../assets/images/more/feedback1.png');

export default function Feedback() {
  const [star, setStar] = useState(0);
  const [feedback, setFeedback] = useState('');
  const dispatch = useDispatch();
  const handleSendFeedback = () => {
    dispatch(sendFeedback(star, feedback));
  };
  return (
    <View>
      <View style={styles.container}>
        <Image source={Feedback1} style={styles.imageStyle} />
        <Text style={styles.heading1}>
          Please take a moment to leave a comment. It would be really helpful to
          us.
        </Text>
        <Text style={styles.heading}>Like using Timesheet ?</Text>
        <View style={styles.starContainer}>
          <Pressable onPress={() => setStar(1)}>
            <Icon
              name={'star'}
              size={24}
              color={star >= 1 ? '#FECA36' : '#D9D9D9'}
            />
          </Pressable>
          <Pressable onPress={() => setStar(2)}>
            <Icon
              name={'star'}
              size={24}
              color={star >= 2 ? '#FECA36' : '#D9D9D9'}
            />
          </Pressable>
          <Pressable onPress={() => setStar(3)}>
            <Icon
              name={'star'}
              size={24}
              color={star >= 3 ? '#FECA36' : '#D9D9D9'}
            />
          </Pressable>
          <Pressable onPress={() => setStar(4)}>
            <Icon
              name={'star'}
              size={24}
              color={star >= 4 ? '#FECA36' : '#D9D9D9'}
            />
          </Pressable>
          <Pressable onPress={() => setStar(5)}>
            <Icon
              name={'star'}
              size={24}
              color={star >= 5 ? '#FECA36' : '#D9D9D9'}
            />
          </Pressable>
        </View>
        <TextInput
          style={styles.inputFeild}
          placeholder="Your Opinion...."
          placeholderTextColor="#555555"
          textAlignVertical="top"
          value={feedback}
          onChangeText={setFeedback}
        />
      </View>
      <Pressable style={styles.btn} onPress={() => handleSendFeedback()}>
        <Text style={styles.btnText}>Send</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#C7C7C7',
    marginHorizontal: 'auto',
    marginTop: 36,
    borderRadius: 8,
    padding: 12,
  },
  imageStyle: {
    alignSelf: 'center',
    margin: 24,
  },
  heading: {
    fontSize: 12,
    fontWeight: 600,
    color: '#888888',
    marginTop: 16,
  },
  heading1: {
    fontSize: 12,
    fontWeight: 400,
    color: '#888888',
    marginTop: 16,
  },
  inputFeild: {
    backgroundColor: '#ECEBEB',
    borderRadius: 8,
    color: '#555555',
    fontSize: 12,
    fontWeight: 600,
    height: 80,
    marginTop: 16,
  },
  btn: {
    width: '90%',
    marginHorizontal: 'auto',
    backgroundColor: '#0085FE',
    borderRadius: 8,
    padding: 12,
    marginTop: 36,
  },
  btnText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 600,
  },
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
  },
});
