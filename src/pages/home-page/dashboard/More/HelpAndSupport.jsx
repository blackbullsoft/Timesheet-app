import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const Hand=require("../../../../assets/images/icon/hand.png")
const Cross=require("../../../../assets/images/icon/cross.png")
const Snowz=require("../../../../assets/images/icon/snowz.png")
const Send=require("../../../../assets/images/icon/send.png")
const RightSend=require("../../../../assets/images/icon/rightSend.png")




export default function HelpAndSupport() {
    const navigation = useNavigation();
    
        useEffect(() => {
            navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
            return () => {
                navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
            };
        }, [navigation]);
  return (
    <View>
      <LinearGradient
      colors={['#0085FE', '#01417B']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ width:"100%",height:250,
        // paddingBottom:80
      }}      
      >
        <View style={styles.header}>

        <View style={styles.left}>
            <Text style={styles.lable}>Hi Test,</Text>
           <Image source={Hand} style={{width:36,height:36}} />
        </View>
        <Pressable style={{width:36,height:36}} onPress={()=>navigation.navigate("MoreScreen")}>
        <Image source={Cross} style={{width:36,height:36}} />
        </Pressable>
        </View>

        <Text style={styles.body}>
        Do you have any questions about Timesheet?
        we’re ready to help. drop us a line below!
        </Text>


      </LinearGradient>
      <View style={styles.overlap}>
        <Text style={styles.overlapHeading}>Start a conversation</Text>
        <View style={styles.box}>
            <Image source={Snowz} style={{width:12,height:16}} />
            <Text style={styles.value}>Back in 2h</Text>
        </View>
        <View>
            <Image source={{uri:"https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg"}} style={[styles.img,{left:0}]}/>
            <Image source={{uri:"https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg"}} style={[styles.img,{left:20}]}/>
            <Image source={{uri:"https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg"}} style={[styles.img,{left:40}]}/>
            <Image source={{uri:"https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg"}} style={[styles.img,{left:60}]}/>
            <Image source={{uri:"https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg"}} style={[styles.img,{left:80}]}/>
            <Image source={{uri:"https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg"}} style={[styles.img,{left:100}]}/>

        </View>
        <View style={styles.btn}>
<Image source={Send} style={{width:14,height:14}}  />
<Text style={styles.btnText}>Send us a message</Text>
        </View>

      </View>

      <View style={styles.container}>
        <Text style={styles.containerHeading}>Find your Answer now</Text>
      </View>
      <View style={styles.sendBtn}>
        <TextInput  placeholder='Search Articles' placeholderTextColor="#555555" style={styles.overlapInput}/>
        <View style={styles.blueBtn}>
            <Image source={RightSend} style={{width:17,height:12}}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
header:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    width:"90%",
    marginHorizontal:"auto",
    alignItems:'center',
    marginTop:35,
},
left:{
    display:"flex",
    flexDirection:"row",
    alignItems:'center'
},
lable:{
    fontSize:24,
    fontWeight:600,
    color:"#FFFFFF"
},
body:{
    width:"90%",
    marginHorizontal:"auto",
    fontSize:12,
    fontWeight:400,
    color:"#FFEFEF",
    marginTop:12
},
overlap:{
    width:'90%',
    position:'absolute',
    top:140,
    alignSelf:"center",
    backgroundColor:"#ffffff",
    padding:24,
    borderRadius:8,
    borderWidth:0.6,
    borderColor:"#0000001F"
   

},
overlapHeading:{
    fontSize:12,
    fontWeight:700,
    color:"#01417B"
},
value:{
    fontSize:12,
    fontWeight:400,
    color:"#555555",
},
box:{
    display:"flex",
    flexDirection:"row",
    alignItems:'center',
    gap:4,
    paddingTop:8
},
imgBox:{
    width:"100%",
    position:'relative',
},
img:{
    width:44,
    height:44,
    borderRadius:50,
    position:'absolute',
    top:12
},
btn:{
    backgroundColor:"#01417B",
    borderRadius:24,
    marginTop:80,
    display:'flex',
    flexDirection:"row",
    alignItems:'center',
    gap:6,
    justifyContent:'center',
    width:180,
    padding:10
    
},
btnText:{
    fontSize:12,
    fontWeight:700,
    color:"#ffffff"
},
container:{
    marginTop:120,
    width:"90%",
    marginHorizontal:"auto"
},
containerHeading:{
    fontSize:12,
    fontWeight:600,
    color:"#000000"
},
overlapInput:{
    width:"100%",
    fontSize:12,
    fontWeight:400,
    paddingRight:60,
    color:"#000000"
},
sendBtn:{
    width:"90%",
    marginHorizontal:"auto",
    position:'relative',
    borderWidth:1,
    borderRadius:8,
    borderColor:"#C7C7C7",
    marginTop:8,
    justifyContent:'center',
    height:56
},
blueBtn:{
backgroundColor:"#0085FE",
borderRadius:6,
position:'absolute',
right:8,
height:44,
width:44,
display:'flex',
alignItems:'center',
justifyContent:"center",
borderRadius:8,
}

})