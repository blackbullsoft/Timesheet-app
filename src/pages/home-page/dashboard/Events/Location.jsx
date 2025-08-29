import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
const Call=require("../../../../assets/images/icon/call.png")
const Direction=require("../../../../assets/images/icon/direction.png")
const Right=require("../../../../assets/images/icon/right.png")
const Admin=require("../../../../assets/images/icon/admin.png")



export default function Location() {
  return (
    <View>
      <View style={styles.btnContainer}>
        <View style={styles.btn}>
<Image source={Direction} style={styles.icon}/>
<Text style={styles.iconText}>Direct</Text>
        </View>
        <View style={styles.btn}>
        <Image source={Call}  style={styles.icon}/>
        <Text style={styles.iconText}>Direct</Text>
        </View>

      </View>
     <View style={styles.box}>
        <Text style={styles.lable}>Location : </Text>
        <Text style={styles.value}>Ministry of justice</Text>
     </View>
    

     <View style={styles.box}>
        <Text style={styles.lable}>Country Code : </Text>
        <Text style={styles.value}>Malta +356</Text>
     </View>
     <View style={styles.box}>
        <Text style={styles.lable}>Phone : </Text>
        <Text style={styles.value}>21240220</Text>
     </View>
     <View style={styles.box}>
        <Text style={styles.lable}>Time Zone : </Text>
        <Text style={styles.value}>Europe/ Malta</Text>
     </View>
     <View style={styles.line}>
     </View>
     <View style={styles.box1}>
        <View style={styles.left}> 
        <Image source={Admin} style={{width:20,height:24}} />
        <Text style={styles.value}>7 Employee</Text>
        </View>
        <Image source={Right} style={{width:12,height:18}} />
     </View>
    </View>
  )
}
const styles=StyleSheet.create({
     btnContainer:{
        width:"100%",
        display:'flex',
        flexDirection:"row",
        justifyContent:'space-between',
        gap:4

     },
     btn:{
        width:"50%",
        backgroundColor:"#01417B",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:12
     },
     iconText:{
        fontSize:12,
        fontWeight:700,
        color:"#ffffff"
     },
     icon:{
        width:30,
        height:30
     },
     box:{
        width:"90%",
        margin:'auto',
        paddingLeft:16,
        paddingVertical:20,
        display:'flex',
        flexDirection:"row",
        borderWidth:1,
        borderColor:"#C7C7C7",
        borderRadius:8,
        marginTop:8
     },
     lable:{
        fontSize:12,
        color:"#555555",
        fontWeight:600
     },
     value:{
        fontSize:12,
        color:"#888888",
        fontWeight:600
     },
     line:{
        height:8,
        backgroundColor:"#ECEBEB",
        borderWidth:0.5,
        borderColor:"#0000001F",
        marginTop:16
     },
     box1:{
        display:"flex",
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:2,
        borderColor:"#01417B",
        width:"90%",
        marginHorizontal:"auto",
        marginTop:16,
        padding:12,
        borderRadius:8
     },
     left:{
        display:"flex",
        flexDirection:"row",
        alignItems:'center',
        gap:8
     }
     
})