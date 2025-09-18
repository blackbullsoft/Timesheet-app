import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ModModalComponental = ({data, showModal, setShowModal}) => {
  const [modalVisible, setModalVisible] = useState(showModal);

  console.log('Modal COmopoen', data, showModal);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
          setShowModal(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
          }}
          // onPress={() => {
          //   setModalVisible(false), setShowModal(false);
          // }}
        >
          <View style={styles.centeredView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                setShowModal(!modalVisible);
              }}
              style={{
                position: 'absolute',
                // backgroundColor: 'red',
                zIndex: 10,
                top: 20,
                right: 20,
              }}>
              <Icon name={'close'} size={28} color="black" />
            </TouchableOpacity>
            <View style={styles.modalView}>
              {data?.map((data, index) => (
                <View key={index}>
                  <Text style={styles.emailModalText}>{data?.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModModalComponental;

const styles = StyleSheet.create({
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
