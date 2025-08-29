import { View, Text, StyleSheet, Image, ScrollView, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
const Dots = require("../../../assets/images/dashboardIcon/dots.png")
const Shift = require("../../../assets/images/dashboardIcon/shift11.png")
const Gift = require("../../../assets/images/dashboardIcon/gift.png")
import Icon from 'react-native-vector-icons/FontAwesome';


import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const isNotification = true
    const navigation=useNavigation()
    return (
        <SafeAreaView>
            <ImageBackground>
            <View style={{ height: "20%" }}>
                <LinearGradient
                    colors={['#0085FE', '#01417B']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ display: 'flex', height: '100%', position: 'relative' }}
                >
                    <View style={styles.container}>
                        <Pressable style={styles.profileContainer} onPress={()=>navigation.navigate("Profile")}>
                            <View>
                                <Image source={{ uri: 'https://img.jagranjosh.com/images/2024/August/2582024/janmashtami-images.jpg' }} style={styles.profileStyle} />
                            </View>
                            <View>
                                <Text style={styles.heading}>Rani kumari</Text>
                                <Text style={styles.subHeading}> Good Morning</Text>
                            </View>

                        </Pressable>
                        <View style={{marginTop:10}}>
                            <Image source={Dots} />
                        </View>
                    </View>
                </LinearGradient>
                <View style={styles.card}>
                    <Image source={Shift} />
                    <Text style={styles.lable}>
                        You don’t have any shifts scheduled
                    </Text>
                </View>
                <Pressable style={{ width: '100%', paddingBottom: 8, borderBottomWidth: 2, borderBottomColor: '#E5E5E5' }} onPress={()=>navigation.navigate("Roaster")}>
                    <Text style={styles.roasterText}>
                        Today’s roster
                        <Icon
                            name={'chevron-right'}
                            size={12}
                            color="#0085FE"
                        />

                    </Text>
                </Pressable>


            </View>
            <View>
                {
                    isNotification ?
                        <ScrollView style={{ height: '68%', marginTop: '20%' }}>
                            <View style={styles.box1}>
                                <Image source={Shift} />
                                <Text style={styles.lable}>
                                    You don’t have any shifts scheduled
                                </Text>
                            </View>
                            <View style={styles.box1}>
                                <Image source={Shift} />
                                <Text style={styles.lable}>
                                    You don’t have any shifts scheduled
                                </Text>
                            </View>
                            <View style={styles.box1}>
                                <Image source={Shift} />
                                <Text style={styles.lable}>
                                    You don’t have any shifts scheduled
                                </Text>
                            </View>
                            <View style={styles.box1}>
                                <Image source={Shift} />
                                <Text style={styles.lable}>
                                    You don’t have any shifts scheduled
                                </Text>
                            </View>
                            <View style={styles.box1}>
                                <Image source={Shift} />
                                <Text style={styles.lable}>
                                    You don’t have any shifts scheduled
                                </Text>
                            </View>
                            <View style={styles.box1}>
                                <Image source={Shift} />
                                <Text style={styles.lable}>
                                    You don’t have any shifts scheduled
                                </Text>
                            </View>
                            <View style={styles.box1}>
                                <Image source={Shift} />
                                <Text style={styles.lable}>
                                    You don’t have any shifts scheduled
                                </Text>
                            </View>
                            <View style={styles.box1}>
                                <Image source={Shift} />
                                <Text style={styles.lable}>
                                    You don’t have any shifts scheduled
                                </Text>
                            </View>
                            <View style={styles.box1}>
                                <Image source={Shift} />
                                <Text style={styles.lable}>
                                    You don’t have any shifts scheduled
                                </Text>
                            </View>

                        </ScrollView> :
                        <View style={styles.box}>
                            <Image source={Gift} />
                            <Text style={styles.heading1}>You're All Set!</Text>
                            <Text style={styles.subHeading1}>No notifications or pending requests. Time to relax!</Text>

                        </View>
                }
            </View>
            </ImageBackground>
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
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    profileStyle: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#ffffff"
    },
    heading: {
        fontSize: 24,
        fontWeight: 600,
        color: "#ffffff"
    },
    subHeading: {
        fontSize: 12,
        fontWeight: 400,
        color: "#ffffff"

    },
    card: {
        width: "90%",
        height: '40%',
        backgroundColor: "#ffffff",
        position: 'absolute',
        bottom: -25,
        alignSelf: 'center',
        borderColor: '#ECEBEB',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        gap: 10
    },
    lable: {
        fontSize: 12,
        fontWeight: 400,
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
        width: '100%',
        height: '75%',
        marginTop: '20%',
        alignItems: 'center',
        paddingTop: 20,
        overflowY: 'scroll'
    },
    heading1: {
        fontSize: 24,
        fontWeight: 600,
        color: "#000000",
        marginTop: 12
    },
    subHeading1: {
        fontSize: 16,
        fontWeight: 400,
        color: '#555555',
        textAlign: 'center',
        padding: 12

    },
    box1: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        borderColor: '#ECEBEB',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        width: "90%",
        paddingLeft: 16,
        height: 40,
        alignItems: 'center',
        borderWidth: 1,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 6
    }

})