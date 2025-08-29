import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
const calender=require('../../../assets/images/dashboardIcon/newsfeed11.png')

export default function Newsfeed() {
  return (
    <View style={styles.container}>
     <Image source={calender}/>
     <Text style={styles.heading}>
     No Content Shared Yet
     </Text>
     <Text style={styles.subHeading}>
     Enjoy your day! 
Check back later for updates.
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
        paddingHorizontal:8,
        width:"80%",
        marginHorizontal:'auto'
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
        fontWeight: 600
      },
})