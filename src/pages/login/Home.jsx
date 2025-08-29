import { View, Text, StyleSheet, ImageBackground, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { alreadyLoginUser } from '../../actions/authAction';

const ImageBackgroundUrl=require('../../assets/images/login/background.png')
const Shift =require("../../assets/images/login/shift.png")
const Dashboard =require("../../assets/images/login/dashboard.png")
const Message =require("../../assets/images/login/message.png")
const NewsFeed =require("../../assets/images/login/newsFeed.png")
const Tasks =require("../../assets/images/login/tasks.png")
const TimeClock =require("../../assets/images/login/timeClock.png")

const data=[
    {
        heading:'Shifts',
        subHeading:"Manage your schedule, time off, availability and shift trade requests.",
        img:Shift
    },
    {
        heading:'Dashboard',
        subHeading:"Get notified about what needs your attention and take immediate action.",
        img:Dashboard
    },
    {
        heading:'Timeclock',
        subHeading:"Easily clock in and out from your phone for accurate time tracking and seamless shift management.",
        img:TimeClock
    },
    {
        heading:'Messages',
        subHeading:"Chat with coworkers either in groups or in private conversations.",
        img:Message
    },
    {
        heading:'Tasks',
        subHeading:"Assign tasks or create your personalized to-do list to stay organized and boost productivity.",
        img:Tasks
    },
    {
        heading:'Newsfeed',
        subHeading:"post information to pages, and share news with your coworkers",
        img:NewsFeed
    },

]
const { width, height } = Dimensions.get("window");

export default function Home() {
    const [showImage,setShowImage]=useState(true)
    const navigation = useNavigation();
    const dispatch=useDispatch()
    const { user,loading } = useSelector((state) => state.auth);

    useEffect(()=>{
        const time=setTimeout(()=>{
            setShowImage(false)
        },500)
        return ()=>setTimeout(time)
    },[])
    const handleNavigateToLogin = (value) => {
        navigation.navigate('SignUp', { isLogin: value});
      };
      useEffect(()=>{
        dispatch(alreadyLoginUser())
      },[])
      useEffect(()=>{
if(user){
    navigation.navigate('HomeDashboard');
}
      },[user])
     
  return (
    <View style={styles.container}>
        {
            loading ? <ImageBackground
            source={ImageBackgroundUrl}
            style={styles.backgroundImage}
            >
                </ImageBackground>
                : <Swiper
                loop={false}
                showsPagination={true}
                dot={<View style={styles.dot} />}
                activeDot={<View style={[styles.dot, styles.activeDot]} />}
                paginationStyle={styles.paginationTop} 
            >
                {data.map((item, index) => (
                    <ImageBackground key={index} source={item.img} style={styles.backgroundImage}>
                        <View style={styles.bottomContainer}>
                            <Text style={styles.heading}>{item.heading}</Text>
                            <Text style={styles.subHeading}>{item.subHeading}</Text>
                            <Pressable style={styles.btnLogin} onPress={() => handleNavigateToLogin(true)}>
                                <Text style={styles.btnText1}>Login Now</Text>
                            </Pressable>
                            <Pressable style={[styles.btnLogin, styles.btnNew]} onPress={() => handleNavigateToLogin(false)}>
                                <Text style={styles.btnText2}>I’m new to Timesheet</Text>
                            </Pressable>
                        </View>
                    </ImageBackground>
                ))}
            </Swiper>
        }
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#ffffff'
    },
    backgroundImage:{
        width:'100%',
        height:'100%'
    },
    bottomContainer:{
        position:'absolute',
        bottom:0,
        paddingHorizontal:48,
        paddingBottom:60,
        display:'flex',
        alignItems:'center',
        width:'100%',
    },
    heading:{
        fontSize:44,
        color:"#ffffff",
        width:'100%',
        textAlign:'center'
    },
    subHeading:{
        fontSize:16,
        color:"#cfd6fa",
        width:"100%",
        textAlign:'center'

    },
    btnLogin:{
        fontSize:16,
        backgroundColor:'#ffffff',        
        lineHeight:31.2,
        paddingVertical:7,
        width:'100%',
        borderRadius:12,
        marginTop:38,
        padding:8
    },
    btnNew:{
        marginTop:12,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius:8
    },
    btnText1:{
        fontSize:16,
        textAlign:'center',
        fontWeight:600,
        color:'#000000',
        
    },
    btnText2:{
        fontSize:16,
        textAlign:'center',
        fontWeight:600,
        color:'#ffffff',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: "#ccc",
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: "#ffffff",
        width: 14,
        height: 14,
    },
    paginationTop: {
        position: "absolute",
    },
})