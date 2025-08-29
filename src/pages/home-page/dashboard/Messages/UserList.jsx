import { View, Text, StyleSheet, Image, TextInput, ScrollView, FlatList,CheckBox, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NoMessage from './NoMessage'
import LoadingAnimation from '../../../../component/Loader'
const SearchIcon=require("../../../../assets/images/icon/search.png")
import Icon from 'react-native-vector-icons/FontAwesome';
const data=[
    {
        name:"Vinay",
        img:"",
        reply:"You",
        message:"do it",
        id:1,
        min:23,
        count:1
    },
    {
        name:"Adam",
        img:"",
        reply:"Vinay",
        message:"what it is?",
        id:2
    },
    {
        name:"Vijay",
        img:"",
        reply:"You",
        message:"do it",
        id:3
    }
]

const Card=(item)=>{
  const [isSelected, setSelection] = useState(false);
  const [isCheck,setIsCheck]=useState(false)
    return (
      <Pressable  style={styles.card} onPress={() => setIsCheck(prev => !prev)}>
      <View style={styles.left}>
        <Image source={{uri:"https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg"}} style={{width:44,height:44,borderRadius:50}}/>
        <View>
<Text style={styles.lable}>{item?.item?.name}</Text>
        </View>
     
      </View>
      <View style={styles.right}  >
        {
          isCheck?
      <Icon
                                  name={'check-square'}
                                  size={24}
                                  color="#01417B"
                              />:
                              <View style={styles.square}>

                              </View>
        }

      </View>
      
     
    </Pressable >
    )
}
export default function UserList() {
  const dispatch=useDispatch()
  const loading=false
    // const { coworkers,loading } = useSelector((state) => state.coworkers);
    useEffect(()=>{
// dispatch(fetchCoworkersList())
    },[])
  return (
    <View>
      <View style={styles.overlapBox}>
    <Image source={SearchIcon} style={styles.iconStyle} />
    <TextInput placeholder='Search for a user...' style={styles.inputStyle} placeholderTextColor="#555555" />
      </View>
      {
        loading?
        <View style={{width:"100%",height:"100%"}}>

        <LoadingAnimation />
        </View>
        :<>  
        {
            data.length==0? <NoMessage />:
        <View style={{marginTop:22}}>
       <FlatList 
          data={data}
          renderItem={({item})=><Card item={item} />}
          keyExtractor={(item) => item.id.toString()}
      
          
          />  
          </View>    
        }
        </>
      }
      
    </View>
  )
}
const styles=StyleSheet.create({
  overlapBox:{
    width:"80%",
    margin:'auto',
    color:"#888888",
    position:'absolute',
    alignSelf:'center',
    marginTop:-20,
    zIndex:99,
    display:'flex',
    flexDirection:'row',
    alignItems:"center",
    paddingLeft:16,
    gap:8,
    backgroundColor:"#ffffff",
    borderRadius:8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  inputStyle:{
    fontSize:12,
    fontWeight:400,
    color:"#555555",
    flex:1
  },
  iconStyle:{
    width:24,
    height:24
  },
  imageStyle:{
    width:40,
    height:60
    
  },
  circle:{
    backgroundColor:"#01417B",
    width:16,
    height:16,
    borderRadius:50,
    justifyContent:"center",
    alignItems:"center"
    
  },
  heading:{
    fontSize:18,
    fontWeight:600,
    color:"#000000",
    textAlign:'center',
    marginTop:8
  },
  line:{
    height:8,
    backgroundColor:"#ECEBEB",
    marginTop:12
  },
  card:{
    width:"100%",
    marginHorizontal:'auto',
    display:'flex',
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:"#E5E5E5",
    paddingHorizontal:12
    
  },
  left:{
    display:'flex',
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
    gap:12,
    padding:16,
    
  },
  lable:{
    fontSize:12,
    fontWeight:700,
    color:"#555555"
  },
  right:{
    alignItems:'center'
  },
  square:{
    width:20,
    height:20,
    borderWidth:1,
    borderColor:"#0000003D"
  }
})