import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
const Pin=require("../../../../assets/images/icon/pin.png")

const data=[
    {
        msg:"ok nnnssssssssssssssssssssssss",
        time:"1:00 pm",
        you:true,
        id:1
    },
    {
        msg:"ok nnnssssssssssssssssssssssssok nnnssssssssssssssssssssssss",
        time:"1:00 pm",
        you:false,
        id:2
    },
    {
        msg:"ok nnnssssssssssssssssssssssss",
        time:"1:00 pm",
        you:true,
        id:3
    },
    {
        msg:"ok nnnssssssssssssssssssssssss",
        time:"1:00 pm",
        you:true,
        id:4
    },
    {
        msg:"ok nnnssssssssssssssssssssssss",
        time:"1:00 pm",
        you:false,
        id:5
    },
    {
        msg:"ok nnnssssssssssssssssssssssss",
        time:"1:00 pm",
        you:true,
        id:6
    },
    {
        msg:"ok nnnssssssssssssssssssssssssok nnnssssssssssssssssssssssss",
        time:"1:00 pm",
        you:false,
        id:7
    },
    {
        msg:"ok nnnssssssssssssssssssssssss",
        time:"1:00 pm",
        you:true,
        id:8
    },
    {
        msg:"ok nnnssssssssssssssssssssssss",
        time:"1:00 pm",
        you:true,
        id:9
    },
    {
        msg:"ok nnnssssssssssssssssssssssss",
        time:"1:00 pm",
        you:false,
        id:10
    },
    {
        msg:"ok nnnssssssssssssssssssssssss",
        time:"1:00 pm",
        you:false,
        id:11
    }

]

const Card=({item})=>{
    return(
        <>
        {
            item?.you?
        <View style={[styles.card,styles.reverse]}>
            <Text style={[styles.message,styles.changeText]}>{item?.msg}</Text>
            <Text style={styles.time}>{item?.time}</Text>

        </View> :
        <View style={[styles.card]}>
            <Text style={styles.message}>{item?.msg}</Text>
            <Text style={styles.time}>{item?.time}</Text>

        </View>
        }
        </>
        
        
    )
}
export default function Message() {
    const navigation = useNavigation();
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
        return () => {
            navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
        };
    }, [navigation]);
    return (
        <View style={styles.container}>
            <FlatList
            data={data}
            renderItem={({item})=><Card item={item}/>}
            keyExtractor={(i)=>i.id}
            />
            <View style={styles.bottomSendMessage}>
               <View style={styles.messageBox}>
                   <Image source={Pin} style={styles.iconStyle} />
                   <TextInput placeholder='Start a conversation...' style={styles.inputStyle} placeholderTextColor="#555555" value={inputValue}
                   onChangeText={setInputValue}
                   />
                     </View>
                     <Text>Send</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:"100%",
        paddingBottom:80
    },
    bottomSendMessage: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        width:"95%",
        alignSelf:'center',
        paddingVertical:6,
        paddingHorizontal:6,
        borderRadius:8,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:12
    },
    inputStyle:{
        flex:1,
        fontSize:12,
        fontWeight:400,
        color:"#555555"
      },
      messageBox:{
        backgroundColor:"#ECEBEB",
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        width:"85%",
        borderRadius:6,
        paddingVertical:6,
        paddingHorizontal:8
      },
      sendStyle:{
        fontSize:12,
        fontWeight:400,
        color:"#555555"
      },
      card:{
        width:"95%",
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'flex-end',
        alignSelf:'center',
        marginTop:16,
        
      },
      message:{
        width:'75%',
        backgroundColor:"#01417B",
        fontSize:12,
        fontWeight:400,
        color:"#ffffff",
        padding:12,
        borderRadius:8,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 0, 
      },
      time:{
        fontSize:12,
        fontWeight:400,
        color:"#888888"
      },
      reverse:{
        flexDirection:'row-reverse',
      },
      changeText:{
        backgroundColor:"#ECEBEB",
        color:"#000000",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 0,
        
      },
      iconStyle:{
        width:12,
        height:18
      }
});
