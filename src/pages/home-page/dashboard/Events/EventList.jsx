import React, { Fragment, useEffect, useState } from "react";
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Animated, Easing, Switch } from 'react-native';
import { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventList } from "../../../../actions/eventAction";
import LoadingAnimation from "../../../../component/Loader";
const LeftBtn = require("../../../../assets/images/icon/leftBtn.png")
const RightBtn = require("../../../../assets/images/icon/rightBtn.png")
const Moon=require("../../../../assets/images/icon/moon.png")
const Sun=require("../../../../assets/images/icon/sun.png")
const Shift=require("../../../../assets/images/icon/shift.png")
const Cross=require("../../../../assets/images/icon/cross1.png")


const screenWidth = Dimensions.get("window").width;

const EventsList = ({route}) => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [showCalendar, setShowCalendar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [menu, setMenu] = useState(0)
  const [myshedule,setMyShedule]=useState(true)
  const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation=useNavigation()
  const dispatch=useDispatch()
  const { events,loading,totalHours } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);

  const translateX = useRef(new Animated.Value(0)).current;
  const animateTransition = (direction, newDate) => {
    translateX.setValue(direction === 'left' ? -20 : 20); 
    setSelectedDate(newDate);
    setCurrentMonth(newDate);

    Animated.timing(translateX, {
      toValue: 0, 
      duration: 900,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleSwipe = ({ nativeEvent }) => {
    const time=setTimeout(()=>{
        if (nativeEvent.translationX > 50) {
          handlePrevWeek();
        } else if (nativeEvent.translationX < -50) {
          handleNextWeek();
        }
    },100)
  };

  const handleDateSelect = (dateString) => {
    const newDate = moment(dateString);
    setSelectedDate(newDate);
    setCurrentMonth(newDate);
    setShowCalendar(false);
  };


  const handlePrevWeek = () => {
      animateTransition('left');
      const newDate = moment(selectedDate).subtract(6, "days");
      setSelectedDate(newDate);
      setCurrentMonth(newDate);
    
  };


  const handleNextWeek = () => {
    animateTransition('right'); 
    const newDate = moment(selectedDate).add(6, "days");
    setSelectedDate(newDate);
    setCurrentMonth(newDate);
  };


  const getWeekDates = () => {
    return Array.from({ length: 6 }).map((_, index) =>
      moment(selectedDate).add(index - 2, "days")
    );
  };
useEffect(() => {
  const startDate = moment(selectedDate).subtract(3, "days").format("YYYY-MM-DD");
  const endDate = moment(selectedDate).add(3, "days").format("YYYY-MM-DD");

  dispatch(fetchEventList(startDate, endDate,myshedule,user?.userId));
}, [selectedDate, dispatch,myshedule]);

useEffect(()=>{
if(route?.params?.model){
setModalVisible(true)
}else{
  setModalVisible(false)
}
},
[route])
  return (
    <View style={styles.container}>
      <Pressable style={styles.overlapBtn} onPress={() => setShowCalendar((prev) => !prev)}>
        <Text style={styles.monthText}>{currentMonth.format("MMMM YYYY")} ▼</Text>
      </Pressable>
      {showCalendar && (
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={(day) => handleDateSelect(day.dateString)}
            initialDate={selectedDate.format("YYYY-MM-DD")} 
            // markedDates={{
            //   "2025-03-06": { selected: true, marked: true, dotColor: "red" },
            //   "2025-02-18": { selected: true, marked: true, dotColor: "red" },
            //   [selectedDate.format("YYYY-MM-DD")]: {
            //     selected: true,
            //     selectedColor: "blue",
            //   },
            // }}
            renderHeader={(date) => (
              <Text style={{ color: "white", fontSize: 18 }}>
                {date.toString("MMMM yyyy")}
              </Text>
            )}
            hideExtraDays={true}
            style={{
              backgroundColor: "#0085FE",
              padding: 10,
              width: screenWidth,
            }}
            theme={{
              calendarBackground: "#0085FE",
              textSectionTitleColor: "white",
              dayTextColor: "white",
              monthTextColor: "white",
              arrowColor: "white",
              todayTextColor: "yellow",
              //         textDayFontSize: 18,
              // textDayFontWeight: "800",
              // textMonthFontSize: 18,
              // textMonthFontWeight: "800",
              textDayHeaderFontSize: 16,
              textDayHeaderFontWeight: "700"
            }}
          />
        </View>

      )}
      <View style={styles.header}>
        <Pressable onPress={() => setMyShedule(true)}>
          <Text style={[styles.headerText, myshedule && styles.selectedText]}>My schedule</Text>
        </Pressable>
        {
          user?.role=="1" && 
        <Pressable onPress={() => setMyShedule(false)}>
          <Text style={[styles.headerText, !myshedule && styles.selectedText]}>Full schedules</Text>
        </Pressable>
        }
      </View>
      <PanGestureHandler onGestureEvent={handleSwipe}>
      <View style={styles.datePicker}>
        <TouchableOpacity onPress={handlePrevWeek} style={styles.navButton}>
          <Image source={LeftBtn} />
        </TouchableOpacity>
        <Animated.View style={{ transform: [{ translateX }] }}>
        <FlatList
          data={getWeekDates()}
          horizontal
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => {
            const isSelected = item.isSame(selectedDate, "day");
            return (
              <TouchableOpacity
                style={[
                  styles.dateItem,
                  isSelected && styles.selectedDate,
                ]}
                onPress={() => setSelectedDate(item)}
              >
                <Text
                  style={[
                    styles.dateText,
                    isSelected && { color: "#007BFF", fontSize: 22, fontWeight: 600 },
                  ]}
                >
                  {item.format("D")}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        </Animated.View>


        <TouchableOpacity onPress={handleNextWeek} style={styles.navButton}>
          <Image source={RightBtn} />
        </TouchableOpacity>
      </View>
      </PanGestureHandler>
      {
        loading?<>
        <View style={{height:"50%",width:'100%',marginTop:"10%"}}>

        <LoadingAnimation />
        </View>
        </>:<>
      <View style={styles.header1}>
        <View style={{display:'flex',flexDirection:'row',gap:4}}>
        <Text >{moment(selectedDate).subtract(2, "days").format("DD")} - {moment(selectedDate).add(3, "days").format("DD")} 
        </Text>
        <Text> {moment(selectedDate).format("MMMM ")}</Text>
        </View>
        <Text>{totalHours}h</Text>

      </View>
     
      <FlatList
        data={getWeekDates()}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => {
          const dateKey = item.format("YYYY-MM-DD");
          const eventList = events[dateKey] || [];

          return (
            <View style={styles.scheduleItem}>
              <View style={styles.sticky}>
                <Text style={[styles.scheduleDate, selectedDate.isSame(item, "day") && { color: "#0085FE", fontSize: 16, fontWeight: 600 }]}>{item.format("D MMM")}</Text>
                <Text style={[styles.scheduleDateDay, selectedDate.isSame(item, "day") && { color: "#0085FE", fontSize: 28, fontWeight: 600 }]}>{item.format("ddd")}</Text>
              </View>
              {eventList.length > 0 ? (
                <View style={{ width: '75%' }}>
                  {
                    eventList.map((event, index) => (                      
                      <Pressable key={index} style={[styles.eventBox,{backgroundColor:event?.backgroundColor}]} onPress={()=>navigation.navigate("Event",{timesheetId:event?.timesheetId})}>                        
                        <Text style={styles.eventTitle}>
                          {
                            event?.isFullDay?"Time off":<>
                          {event.timing}
                            </>
                          }

                        </Text>
                        {
                          event?.isFullDay && 
                        <Text style={styles.eventBody}>All Day</Text>
                        }

                        <Text style={styles.eventTitle}>{event.name}</Text>
                        
                        {
                          !event?.isFullDay && 
                        <Text style={styles.eventBody}>{event.location}</Text>
                        }
                        {
                          !event?.isFullDay &&  <>
                          {
                          
                          event?.day?<>
                          <Image source={Sun} style={styles.iconSun}/>
                          <Image source={Shift} style={styles.iconShift}/>

                          </>
                          :<Image source={Moon} style={styles.iconMoon}/>
                          
                        }
                          
                          </>
                        }
                        
                        
                        
                      </Pressable>  
                    ))
                  }
                </View>
              ) : (
                <Text style={[styles.scheduleText, selectedDate.isSame(item, "day") && styles.selectedMsg]} onPress={()=>navigation.navigate("Event",{event:null})}>
                  {selectedDate.isSame(item, "day") ? "No Shift today, Just relax." : "No shift scheduled."}
                </Text>
                //   <View style={[styles.noScheduleBox, selectedDate.isSame(item, "day") && { backgroundColor: "red" }]}>
                //   <Text style={styles.scheduleText}>
                //     {selectedDate.isSame(item, "day") ? "Chill, no schedule" : "No shift scheduled."}
                //   </Text>
                // </View>
              )}
            </View>
          );
        }}
      />
      </>
      }
     
       
     <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

            <View style={styles.mheader}>
              <Text style={styles.mheading}>Schedule Filters</Text>
              <Pressable onPress={()=>setModalVisible(!modalVisible)} style={styles.crossIconContainer}>
              <Image source={Cross} style={styles.crossIcon} />
              </Pressable>
              </View>
              <View style={styles.line}></View>
              <View style={styles.box1}>
                <Text style={styles.lable}>Options</Text>
                <Text style={styles.value}>Unselect all</Text>
              </View>
               <View style={styles.box}>
                          <Text style={styles.value}>Day Notes</Text>
                         <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        
                      />
              
                      </View>
                      <View style={styles.line}></View>
                      <View style={styles.box1}>
                <Text style={styles.lable}>Events</Text>
                <Text style={styles.value}>Unselect all</Text>
              </View>
                      <View style={styles.box}>
                          <Text style={styles.value}>Scheduled shifts</Text>
                         <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        
                      />
              
                      </View>
                      <View style={styles.box}>
                          <Text style={styles.value}>Available Shifts</Text>
                         <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        
                      />
              
                      </View>
                      <View style={styles.box}>
                          <Text style={styles.value}>Unassigned shifts</Text>
                         <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        
                      />
              
                      </View>
                      <View style={styles.box}>
                          <Text style={styles.value}>Time off</Text>
                         <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        
                      />
              
                      </View>
                      <View style={styles.box}>
                          <Text style={styles.value}>No Shows</Text>
                         <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}                    
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        
                      />
              
                      </View>
                      <View style={styles.btnContainer}>
                        <View style={styles.btn1}>
      <Text style={styles.btnText1}    
      >
        Reset Filters
      </Text>
                        </View>
                        <View style={styles.btn2}>
                        <Text style={styles.btnText2}>
                        Apply Filters
                        </Text>
                        </View>
                      </View>
            </View>
          </View>
        </Modal>
        

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 15,
  },
  filterIcon: {
    fontSize: 20,
    color: "#FFF",
  },
  overlapBtn: {
    width: "50%",
    zIndex: 100,
    backgroundColor: 'red',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    position: 'absolute',
    top: -15,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: '#ECEBEB',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 0.5,
    borderRadius: 4

  },
  monthText: {
    fontSize: 12,
    fontWeight: 400,
    color: "#01417B",
    textAlign: 'center',



  },
  calendarIcon: {
    fontSize: 20,
    color: "#FFF",
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    paddingVertical: 6,
  },
  navButton: {
    padding: 10,
  },
  dateItem: {
    alignItems: "center",
    padding: 4,
    width: 50,
    justifyContent: 'center'
  },
  selectedDate: {
    // backgroundColor: "#007BFF",
    borderRadius: 5,
    color: "#ffffff",

  },
  dateText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  dayText: {
    fontSize: 12,
    color: "gray",
  },
  scheduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 2,
    alignItems: "baseline",
  },
  sticky:{
// position:'absolute'
  },
  selectedMsg: {
    color: "#01417B",
    backgroundColor: '#C5EDFF',
    fontSize: 12,
    fontWeight: 600,
    borderColor: "#C5EDFF",
    borderRightColor: "#0085FE",
    borderRightWidth: 8,
    borderTopRightRadius: 10,
  },
  scheduleDate: {
    fontSize: 12,
    fontWeight: 400,
    color: '#888888'
  },
  scheduleDateDay: {
    fontSize: 24,
    fontWeight: 600,
    color: '#888888',
    marginTop: -8

  },
  scheduleText: {
    color: "#888888",
    borderWidth: 1,
    borderColor: "#C7C7C7",
    width: '75%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 10,
    fontWeight: 400
  },
  eventBox: {
    backgroundColor: "#0085FE",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    position:'relative'

  },
  iconMoon:{
position:'absolute',
right:16,
top:10
  },
  iconSun:{
    position:'absolute',
    right:16,
    top:10
      },
      iconShift:{
        position:'absolute',
        right:16,
        bottom:10
          },
  eventTitle: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: 600

  },
  eventBody: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: 600
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: 'absolute',
    zIndex: 99,
    alignSelf: 'center',
    top: 0
  },
  closeButton: {
    fontSize: 18,
    color: "#FFF",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical:12,
    marginTop: 12
  },
  headerText: {
    color: '#555555',
    fontSize: 12,
    fontWeight: 600,

   
  },
  selectedText: {
    borderBottomWidth: 4,
    borderBottomColor: '#0085FE',
    borderRadius: 8,
    paddingBottom: 4,
    color: "#0085FE"
  },
  header1:{
    display:"flex",
    flexDirection:"row",
    justifyContent:'space-between',
    paddingHorizontal:12,
    borderWidth:1,
    borderColor:"#E5E5E5",
    backgroundColor:"#ffffff",
    padding:4
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    // margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width:"90%"
    // padding: 35,
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  mheader:{
    width:"100%",
    position:"relative"
  },
  mheading:{
    fontSize:12,
    fontWeight:600,
    color:"#555555",
    textAlign:'center',
    padding:16
  },
  line:{
    height:8,
    backgroundColor:"#ECEBEB",
    borderWidth:0.5,
    borderColor:"#0000001F"
  },
  box:{
    borderWidth:1,
    borderColor:"#C7C7C7",
    padding:12,
    borderRadius:8,
    marginVertical:8,
    display:"flex",
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:"center",
    width:"90%",
    marginHorizontal:"auto"

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
box1:{
  display:"flex",
  flexDirection:'row',
  justifyContent:"space-between",
  width:"90%",
  margin:"auto",
  marginTop:8
},
btnContainer:{
  width:"90%",
  display:'flex',
  flexDirection:"row",
  marginHorizontal:'auto'
  

},
btn1:{
  width:"45%",
  backgroundColor:"#0085FE",
  paddingVertical:8,
  borderRadius:8,
  textAlign:'center',
  margin:8,
  paddingHorizontal:12,
},
btnText1:{
  textAlign:"center",
  color:"#ffffff",
  
},
btn2:{
  width:"45%",
  // paddingHorizontal:12,
  backgroundColor:"#ffffff",
  paddingVertical:8,
  borderRadius:8,
  textAlign:'center',
  margin:8,
  borderWidth:2,
  borderColor:"#01417B"
},
btnText2:{
  textAlign:"center",
  color:"#01417B",
  
},
crossIconContainer:{
  position:'absolute',
  right:10,
  top:14
},
crossIcon:{
  width:25,
  height:25,
  
}
});

export default EventsList;
