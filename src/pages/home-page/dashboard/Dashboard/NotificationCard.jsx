import { View, Text, StyleSheet, Image, ScrollView, Pressable, ImageBackground, FlatList } from 'react-native'
import React from 'react'
const Dots = require("../../../../assets/images/dashboardIcon/dots.png")
const Shift = require("../../../../assets/images/dashboardIcon/colorShift.png")
const Gift = require("../../../../assets/images/dashboardIcon/gift.png")
import Icon from 'react-native-vector-icons/FontAwesome';


import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
 const NotificationData=[
    {
        id:1,
        title:"okkkk1"
    },
    {
        id:2,
        title:"okkkk2"
    },
    {
        id:3,
        title:"okkkk3"
    },
    {
        id:4,
        title:"okkkk4"
    },
    {
        id:5,
        title:"okkkk4"
    },
    {
        id:6,
        title:"okkkk4"
    },
    {
        id:7,
        title:"okkkk4"
    },
    {
        id:8,
        title:"okkkk3"
    },
    {
        id:9,
        title:"okkkk4"
    },
    {
        id:10,
        title:"okkkk4"
    },
    {
        id:11,
        title:"okkkk4"
    },
    {
        id:12,
        title:"okkkk4"
    },
    {
        id:13,
        title:"okkkk4"
    },
    {
        id:14,
        title:"okkkk4"
    },
    {
        id:15,
        title:"okkkk4"
    }
  ]
  const Card=({item})=>{
    const navigation=useNavigation()
    console.log(item?.title,"item")
    return(
        <View style={styles.box}>
        <Pressable style={styles.box1} onPress={()=>navigation.navigate("Event")}>
            <Image source={Shift} />
            <Text style={styles.lable}>
            {item?.title}
            </Text>                               
        </Pressable>
        <View style={styles.right}>
            <Text  style={[styles.date, { transform: [{ rotate: '-90deg' }] }]}>Web</Text>
        </View>
            </View>
    )
  }

export default function Home() {
    return (
        <SafeAreaView> 
            <View style={{marginTop:12}}>

            
            <FlatList 
                         data={NotificationData}
                         renderItem={({item})=><Card item={item}/>}
                         keyExtractor={(i)=>i?.id}
                         contentContainerStyle={{ paddingBottom: 10 }} 
                                     
                                     />   
                                     </View>            
           
                
                   
                       
                
            
           
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // position:'relative'
    },
    lable: {
        fontSize: 12,
        fontWeight: 600,
        color:"#888888"
    },
    roasterText: {
        fontSize: 12,
        fontWeight: 600,
        color: '#0085FE',
        marginTop: '10%',
        alignSelf: 'center',
        paddingBottom: 4,
        borderBottomWidth: 4,
        borderBottomColor: "#0085FE",
        textAlign: 'center',
        paddingHorizontal: 8,
        direction: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    box: {
        display:'flex',
        flexDirection:'row',
        marginLeft:25,
        justifyContent:'space-between',
    },
    box1: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        borderColor: '#0085FE',
        borderRadius: 8,
        width: "90%",
        paddingLeft: 16,
        alignItems: 'center',
        borderWidth: 2,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 0,
        paddingVertical:12,
        height:50
    },
    right:{
        width:28,
        height:50,
        backgroundColor:'#0085FE',
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
        display:'flex',
        justifyContent:'center',
    },
    date: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "600",
    },
    

})