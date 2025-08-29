import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShift } from '../../../../actions/shiftAction'
import LoadingAnimation from '../../../../component/Loader'
const Calender=require("../../../../assets/images/events/calender.png")
const Location=require("../../../../assets/images/events/location.png")
const Repeat=require("../../../../assets/images/events/repeat.png")
const NotFound=require("../../../../assets/images/events/notFound.png")


const formatDate = (dateString) => {
    if (!dateString) return "";
  
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  };
export default function Event({route}) {    
   const dispatch=useDispatch()
   const navigation=useNavigation()
   const {data,loading}=useSelector((state) => state.shift)
   useEffect(()=>{
    console.log(route?.params?.timesheetId,"route",route)
if(route?.params?.timesheetId){
dispatch(fetchShift(route?.params?.timesheetId))
}

   },[route])

  return (
    <View>
        {
        loading?<>
        <View style={{height:"80%",width:'100%',marginTop:"10%"}}>
        <LoadingAnimation />
        </View>
        </>:<>
        {
            data ?
    <ScrollView >
      <View style={styles.box}>
        <Image source={Calender} style={{width:150,height:150}}/>
        <Text style={styles.title}>
        {data?.events}
        </Text>
        <View style={styles.btnContainer}>
            <Text style={styles.btn}>
                {data?.startTime} To {data?.endTime} - {data?.hours} hours
            </Text>
        </View>
      </View>
      <View style={styles.line}>
      </View>
    <Pressable style={styles.card} onPress={()=>navigation.navigate("UserProfile",{employeeId:data?.employeeId})}>
        <View style={styles.left}>
    <Image source={{uri:"https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg"}} style={styles.imgStyle}/>
    <Text style={styles.leftTitle}>
    Employee:
    </Text>
    <Text style={styles.leftSubTitle}>{data?.username}</Text>
        </View>
        <View style={styles.right}>
            <View style={styles.rightLine}>

            </View>
        </View>

    </Pressable>
    <Pressable style={styles.card} onPress={()=>navigation.navigate("Location")} >
        <View style={styles.left}>
            <View style={styles.imgStyle}>
    <Image source={Location}  resizeMode="contain" style={{width:30,height:30}}/>
            </View>
    <Text style={styles.leftTitle}>
    Location:
    </Text>
    <Text style={styles.leftSubTitle}>{data?.location}</Text>
        </View>
        <View style={styles.right}>
            <View style={styles.rightLine}>

            </View>
        </View>

    </Pressable>
    <View style={[styles.card,{alignItems:'flex-start'}]}>
        <View style={[styles.left,{alignItems:'flex-start'}]}>
        <View style={styles.imgStyle}>
    <Image source={Repeat} resizeMode="contain" style={{width:30,height:30}}/>
            </View>
    <View>
    <Text style={styles.leftTitle}>
    Repeat
    </Text>
    <Text style={styles.leftSubTitle}>This week on: </Text>
    <Text style={styles.leftSubTitle}>Missing </Text>
    <Text style={styles.leftSubTitle}>Until: Missing</Text>

        </View>
    </View>
        

    </View>

    <View style={styles.date}>
    <Text style={styles.leftTitle}>
    Date :
    </Text>
    <Text style={styles.leftSubTitle}> {formatDate(data?.date)}</Text>

    </View>  
   
    </ScrollView>
    :
    <View style={styles.container}>
         <Image source={NotFound}/>
         <Text style={styles.heading}>
         No Shifts Available
         </Text>
         <Text style={styles.subHeading}>
         There are no available or pending shift offers this week.
         </Text>     
        </View>
        }
        </>}
    </View>
  )
}
const styles=StyleSheet.create({
box:{
    display:'flex',
    alignItems:'center',
    paddingTop:36
},
title:{
    fontSize:16,
    fontWeight:600,
    color:"#000000",
    marginTop:24
},
btnContainer:{
    backgroundColor:"#FECA36",
    width:'80%',
    display:'flex',
    alignItems:'center',
    borderRadius:8,
    marginTop:16,
},
btn:{
    width:'95%',
    backgroundColor:"#004079",
    textAlign:'center',
    color:'#FFFFFF',
    fontSize:12,
    fontWeight:16,
    paddingVertical:12,
    borderRadius:8
},
line:{
    height:8,
    backgroundColor:"#ECEBEB",
    width:'100%',
    marginTop:24
},
imgStyle:{
    width:40,
    height:40,
    borderRadius:50,
    borderWidth:2,
    borderColor:"#01417B",
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
},
card:{
    display:'flex',
    flexDirection:'row',
    width:'90%',
    margin:'auto',
    borderWidth:2,
    borderColor:"#01417B",
    borderRadius:8,
    paddingLeft:16,
    paddingVertical:8,
    marginTop:8,
    justifyContent:'space-between'
},
left:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    alignItems:'center'
},
right:{
    backgroundColor:"#01417B",
    height:"98%",
    width:8,
    borderBottomLeftRadius:4,
    borderTopLeftRadius:4
},
leftTitle:{
fontSize:10,
fontWeight:600,
color:"#555555"
},
leftSubTitle:{
    fontSize:10,
    fontWeight:600,
    color:"#888888"
},
date:{
    width:"90%",
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    borderWidth:1,
    borderColor:"#C7C7C7",
    margin:'auto',
    paddingVertical:16,
    marginVertical:24,
    borderRadius:8
},
container:{
    display:'flex',
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
},
heading:{
    fontSize:24,
    fontWeight:600,
    color:"#000000",
    marginTop:12
},
subHeading:{
    fontSize:16,
    fontWeight:400,
    color:"#555555",
    marginTop:8,
    textAlign:'center',
    paddingHorizontal:8
},
})
