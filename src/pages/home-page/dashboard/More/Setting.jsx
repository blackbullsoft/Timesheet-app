import { View, Text, ScrollView, StyleSheet, Switch, Image } from 'react-native'
import React, { useState } from 'react'
const rightGrey=require("../../../../assets/images/icon/rightGrey.png")

export default function Setting() {
    const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <ScrollView>
        <View style={styles.container}>
<Text style={styles.lable}>Messages</Text>
        <View style={styles.box}>
            <Text style={styles.value}>Play Sound effects</Text>
           <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          
        />

        </View>
        <View style={styles.box}>
            <Text style={styles.value}>Show others when i’m typing </Text>
           <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          
        />

        </View>        
        </View>
        <View style={styles.line}></View>
        <View style={styles.container}>
<Text style={styles.lable}>Shifts</Text>
        <View style={styles.box}>
            <Text style={styles.value}>Play Sound Effects</Text>
            <View style={styles.right}>
            <Text style={styles.value}>1:40 PM  </Text>
            <Image  source={rightGrey}/>
            </View>
        </View>     
        </View>
        <View style={styles.line}></View>
        <View style={styles.container}>
<Text style={styles.lable}>Shift alarms</Text>
        <View style={styles.box}>
            <Text style={styles.value}>Enable Shift alarms</Text>
           <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          
        />

        </View>
        <View style={styles.box}>
            <Text style={styles.value}>Reminder before</Text>
            <View style={styles.right}>
            <Text style={styles.value}>60 Minutes  </Text>
            <Image  source={rightGrey}/>
            </View>
        </View>     
        </View>
        <View style={styles.line}></View>
        <View style={styles.container}>
<Text style={styles.lable}>Dashboard notifications</Text>
<View style={styles.box}>
            <Text style={styles.value}>Notify Me About</Text>
            <View style={styles.right}>
            <Text style={styles.value}>All new dashboar..  </Text>
            <Image  source={rightGrey}/>
            </View>
        </View> 
        <View style={styles.box}>
            <Text style={styles.value}>Notify Via Push Notifications</Text>
           <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          
        />

        </View>
        <View style={styles.box}>
            <Text style={styles.value}>Notify Via Email</Text>
           <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          
        />

        </View>
            
        </View>
        <View style={styles.line}></View>
        <View style={styles.container}>
<Text style={styles.lable}>Massage notifications</Text>
<View style={styles.box}>
            <Text style={styles.value}>Notify Me About</Text>
            <View style={styles.right}>
            <Text style={styles.value}>All new Messages  </Text>
            <Image  source={rightGrey}/>
            </View>
        </View> 
        <View style={styles.box}>
            <Text style={styles.value}>Notify Via Push Notifications</Text>
           <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          
        />

        </View>
        <View style={styles.box}>
            <Text style={styles.value}>Notify Via Email</Text>
           <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          
        />

        </View>
            
        </View>        
        <View style={styles.line}></View>
        <View style={styles.container}>
<Text style={styles.lable}>Newsfeed notifications</Text>
<View style={styles.box}>
            <Text style={styles.value}>Notify Me About</Text>
            <View style={styles.right}>
            <Text style={styles.value}>All new Posts  </Text>
            <Image  source={rightGrey}/>
            </View>
        </View> 
        <View style={styles.box}>
            <Text style={styles.value}>Notify Via Push Notifications</Text>
           <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          
        />

        </View>
        <View style={styles.box}>
            <Text style={styles.value}>Notify Via Email</Text>
           <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          
        />

        </View>
            
        </View>        
        <View style={styles.line}></View>
        <View style={[styles.box,{width:"90%",margin:"auto",marginBottom:20,marginTop:20}]}>
            <Text style={styles.value}>App Version</Text>
            <View style={styles.right}>
            <Text style={styles.value}>3.0.485 </Text>
            </View>
        </View>  
    </ScrollView>
  )
}
const styles=StyleSheet.create({
    container:{
        width:"95%",
        marginHorizontal:'auto',
        padding:12
    },
    box:{
        borderWidth:1,
        borderColor:"#C7C7C7",
        padding:12,
        borderRadius:8,
        marginTop:8,
        display:"flex",
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:"center"

    },
    lable:{
fontSize:12,
fontWeight:600,
color:"#555555"
    },
    value:{
        fontSize:12,
        fontWeight:400,
        color:"#888888",
    },
    line:{
        height:8,
        backgroundColor:"#ECEBEB",
        borderWidth:0.4,
        borderColor:"#0000001F"
    },
    right:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center'
    }
})