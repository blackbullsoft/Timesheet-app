import React, {Fragment, useEffect, useState} from 'react';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {Animated, Easing} from 'react-native';
import {useRef} from 'react';
import {LayoutAnimation} from 'react-native';
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
} from 'react-native';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
const LeftBtn = require('../../../assets/images/icon/leftBtn.png');
const RightBtn = require('../../../assets/images/icon/rightBtn.png');
const Moon = require('../../../assets/images/icon/moon.png');
const Sun = require('../../../assets/images/icon/sun.png');
const Shift = require('../../../assets/images/icon/shift.png');

const screenWidth = Dimensions.get('window').width;

const events = {
  '2025-03-06': [
    {
      name: 'Alex Borg',
      location: 'Mirzapur',
      backgroundColor: '#01417B',
      day: false,
      timing: '6:00 AM - 4:00 PM, 10hours',
      isFullDay: false,
    },
    {
      name: 'Alex Borg',
      location: 'Nodia',
      backgroundColor: '#DDDDDD',
      day: true,
      timing: '6:00 AM - 4:00 PM, 10hours',
      isFullDay: true,
    },
    {
      name: 'Alex Borg',
      location: 'Delhi',
      backgroundColor: '#0085FE',
      day: true,
      timing: '6:00 AM - 4:00 PM, 10hours',
      isFullDay: false,
    },
  ],
  '2025-02-18': [
    {
      name: 'Alex Borg',
      location: 'RS2 Mosta ',
      backgroundColor: '#0085FE',
      day: true,
      timing: '6:00 AM - 4:00 PM, 10hours',
      isFullDay: false,
    },
  ],
  '2024-12-18': [
    {
      name: 'Alex Borg',
      location: 'RS2 Mosta ',
      backgroundColor: '#0085FE',
      day: true,
      timing: '6:00 AM - 4:00 PM, 10hours',
      isFullDay: false,
    },
  ],
};

const CalendarScreen = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [showCalendar, setShowCalendar] = useState(false);
  const [menu, setMenu] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const animateTransition = (direction, newDate) => {
    translateX.setValue(direction === 'left' ? -10 : 10);
    setSelectedDate(newDate);
    setCurrentMonth(newDate);

    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleSwipe = ({nativeEvent}) => {
    const time = setTimeout(() => {
      if (nativeEvent.translationX > 50) {
        handlePrevWeek();
      } else if (nativeEvent.translationX < -50) {
        handleNextWeek();
      }
    }, 100);
  };

  const handleDateSelect = dateString => {
    const newDate = moment(dateString);
    setSelectedDate(newDate);
    setCurrentMonth(newDate);
    setShowCalendar(false);
  };

  const handlePrevWeek = () => {
    animateTransition('left');
    const newDate = moment(selectedDate).subtract(6, 'days');
    setSelectedDate(newDate);
    setCurrentMonth(newDate);
  };

  const handleNextWeek = () => {
    animateTransition('right');
    const newDate = moment(selectedDate).add(6, 'days');
    setSelectedDate(newDate);
    setCurrentMonth(newDate);
  };

  const getWeekDates = () => {
    return Array.from({length: 6}).map((_, index) =>
      moment(selectedDate).add(index - 2, 'days'),
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.overlapBtn}
        onPress={() => setShowCalendar(prev => !prev)}>
        <Text style={styles.monthText}>
          {currentMonth.format('MMMM YYYY')} ▼
        </Text>
      </Pressable>
      {showCalendar && (
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={day => handleDateSelect(day.dateString)}
            initialDate={selectedDate.format('YYYY-MM-DD')}
            markedDates={{
              '2025-03-06': {selected: true, marked: true, dotColor: 'red'},
              '2025-02-18': {selected: true, marked: true, dotColor: 'red'},
              [selectedDate.format('YYYY-MM-DD')]: {
                selected: true,
                selectedColor: 'blue',
              },
            }}
            renderHeader={date => (
              <Text style={{color: 'white', fontSize: 18}}>
                {date.toString('MMMM yyyy')}
              </Text>
            )}
            hideExtraDays={true}
            style={{
              backgroundColor: '#0085FE',
              padding: 10,
              width: screenWidth,
            }}
            theme={{
              calendarBackground: '#0085FE',
              textSectionTitleColor: 'white',
              dayTextColor: 'white',
              monthTextColor: 'white',
              arrowColor: 'white',
              todayTextColor: 'yellow',
              //         textDayFontSize: 18,
              // textDayFontWeight: "800",
              // textMonthFontSize: 18,
              // textMonthFontWeight: "800",
              textDayHeaderFontSize: 16,
              textDayHeaderFontWeight: '700',
            }}
          />
        </View>
      )}
      <View style={styles.header}>
        <Pressable onPress={() => setMenu(0)}>
          <Text style={[styles.headerText, menu == 0 && styles.selectedText]}>
            My schedule
          </Text>
        </Pressable>
        <Pressable onPress={() => setMenu(1)}>
          <Text style={[styles.headerText, menu == 1 && styles.selectedText]}>
            Full schedule
          </Text>
        </Pressable>
        <Pressable onPress={() => setMenu(2)}>
          <Text style={[styles.headerText, menu == 2 && styles.selectedText]}>
            Available
          </Text>
        </Pressable>
      </View>
      <PanGestureHandler onGestureEvent={handleSwipe}>
        <View style={styles.datePicker}>
          <TouchableOpacity onPress={handlePrevWeek} style={styles.navButton}>
            <Image source={LeftBtn} />
          </TouchableOpacity>
          <Animated.View style={{transform: [{translateX}]}}>
            <FlatList
              data={getWeekDates()}
              horizontal
              keyExtractor={item => item.toString()}
              renderItem={({item}) => {
                const isSelected = item.isSame(selectedDate, 'day');
                return (
                  <TouchableOpacity
                    style={[styles.dateItem, isSelected && styles.selectedDate]}
                    onPress={() => setSelectedDate(item)}>
                    <Text
                      style={[
                        styles.dateText,
                        isSelected && {
                          color: '#007BFF',
                          fontSize: 30,
                          fontWeight: 600,
                        },
                      ]}>
                      {item.format('D')}
                    </Text>
                    {/* <Text
          style={[
            styles.dayText,
            isSelected && { color: "#007BFF",fontSize:18  }, 
          ]}
        >
          {item.format("ddd")}
        </Text> */}
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

      <FlatList
        data={getWeekDates()}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => {
          const dateKey = item.format('YYYY-MM-DD');
          const eventList = events[dateKey] || [];

          return (
            <View style={styles.scheduleItem}>
              <View>
                <Text
                  style={[
                    styles.scheduleDate,
                    selectedDate.isSame(item, 'day') && {
                      color: '#0085FE',
                      fontSize: 22,
                      fontWeight: 600,
                    },
                  ]}>
                  {item.format('D MMM')}
                </Text>
                <Text
                  style={[
                    styles.scheduleDateDay,
                    selectedDate.isSame(item, 'day') && {
                      color: '#0085FE',
                      fontSize: 28,
                      fontWeight: 600,
                    },
                  ]}>
                  {item.format('ddd')}
                </Text>
              </View>
              {eventList.length > 0 ? (
                <View style={{width: '72%'}}>
                  {eventList.map((event, index) => (
                    <View
                      key={index}
                      style={[
                        styles.eventBox,
                        {backgroundColor: event?.backgroundColor},
                      ]}>
                      <Text style={styles.eventTitle}>
                        {event?.isFullDay ? 'Time off' : <>{event.timing}</>}
                      </Text>
                      {event?.isFullDay && (
                        <Text style={styles.eventBody}>All Day</Text>
                      )}

                      <Text style={styles.eventTitle}>{event.name}</Text>

                      {!event?.isFullDay && (
                        <Text style={styles.eventBody}>{event.location}</Text>
                      )}
                      {!event?.isFullDay && (
                        <>
                          {event?.day ? (
                            <>
                              <Image source={Sun} style={styles.iconSun} />
                              <Image source={Shift} style={styles.iconShift} />
                            </>
                          ) : (
                            <Image source={Moon} style={styles.iconMoon} />
                          )}
                        </>
                      )}
                    </View>
                  ))}
                </View>
              ) : (
                <Text
                  style={[
                    styles.scheduleText,
                    selectedDate.isSame(item, 'day') && styles.selectedMsg,
                  ]}>
                  {selectedDate.isSame(item, 'day')
                    ? 'No Shift today, Just relax.'
                    : 'No shift scheduled.'}
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 15,
  },
  filterIcon: {
    fontSize: 20,
    color: '#FFF',
  },
  overlapBtn: {
    width: '50%',
    zIndex: 100,
    backgroundColor: 'red',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    position: 'absolute',
    top: -15,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#ECEBEB',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 0.5,
    borderRadius: 4,
  },
  monthText: {
    fontSize: 12,
    fontWeight: 400,
    color: '#01417B',
    textAlign: 'center',
  },
  calendarIcon: {
    fontSize: 20,
    color: '#FFF',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 6,
  },
  navButton: {
    padding: 10,
  },
  dateItem: {
    alignItems: 'center',
    padding: 4,
    width: 50,
    justifyContent: 'center',
  },
  selectedDate: {
    // backgroundColor: "#007BFF",
    borderRadius: 5,
    color: '#ffffff',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: 12,
    color: 'gray',
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 2,
    alignItems: 'center',
  },
  selectedMsg: {
    color: '#01417B',
    backgroundColor: '#C5EDFF',
    fontSize: 12,
    fontWeight: 600,
    borderColor: '#C5EDFF',
    borderRightColor: '#0085FE',
    borderRightWidth: 8,
    borderTopRightRadius: 10,
  },
  scheduleDate: {
    fontSize: 12,
    fontWeight: 400,
    color: '#888888',
  },
  scheduleDateDay: {
    fontSize: 28,
    fontWeight: 600,
    color: '#888888',
    marginTop: -8,
  },
  scheduleText: {
    color: '#888888',
    borderWidth: 1,
    borderColor: '#C7C7C7',
    width: '72%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 400,
  },
  eventBox: {
    backgroundColor: '#0085FE',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    position: 'relative',
  },
  iconMoon: {
    position: 'absolute',
    right: 16,
    top: 30,
  },
  iconSun: {
    position: 'absolute',
    right: 16,
    top: 15,
  },
  iconShift: {
    position: 'absolute',
    right: 16,
    bottom: 15,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 600,
  },
  eventBody: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 600,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    zIndex: 99,
    alignSelf: 'center',
    top: 0,
  },
  closeButton: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 18,
    marginTop: 12,
  },
  headerText: {
    color: '#555555',
    fontSize: 14,
    fontWeight: 600,
  },
  selectedText: {
    borderBottomWidth: 8,
    borderBottomColor: '#0085FE',
    borderRadius: 8,
    paddingBottom: 4,
    color: '#0085FE',
  },
});

export default CalendarScreen;
