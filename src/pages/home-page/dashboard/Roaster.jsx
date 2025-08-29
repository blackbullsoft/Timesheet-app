import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
const calender=require('../../../assets/images/dashboardIcon/calender.png')

export default function Roaster() {
  return (
    <View style={styles.container}>
     <Image source={calender}/>
     <Text style={styles.heading}>
     No schedule Today
     </Text>
     <Text style={styles.subHeading}>
     No employees are scheduled today. Relax and recharge!
     </Text>
     <Pressable style={styles.btnContainer}>
                     <Text style={[styles.btn]} >
                     Build a schedule
                     </Text>
                   </Pressable>
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
        fontSize:14,
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
        width: '80%',
        backgroundColor: '#0085FE',
        borderRadius: 8,
        marginTop: 20,
      },
      btn: {
        color: '#ffffff',
        textAlign: 'center',
        paddingVertical: 8,
        fontSize: 12,
        fontWeight: 600
      },
})