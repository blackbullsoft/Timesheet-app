import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
const calender=require('../../../../assets/images/dashboardIcon/message11.png')

export default function NoMessage() {
  return (
    <View style={styles.container}>
     <Image source={calender}/>
     <Text style={styles.heading}>
     No Conversations Yet
     </Text>
     <Text style={styles.subHeading}>
     It looks like you haven’t started any conversations. Tap the + in the menu above to start chatting with a group or an individual.
     </Text>     
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        display:'flex',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    heading:{
        fontSize:20,
        fontWeight:600,
        color:"#000000",
        marginTop:12
    },
    subHeading:{
        fontSize:14,
        fontWeight:400,
        color:"#555555",
        marginTop:8,
        textAlign:'center',
        paddingHorizontal:8
    },
    btnContainer: {
        width: '90%',
        backgroundColor: '#0085FE',
        borderRadius: 8,
        marginTop: 20,
      },
      btn: {
        color: '#ffffff',
        textAlign: 'center',
        paddingVertical: 8,
        fontSize: 16,
        fontWeight: 600
      },
})