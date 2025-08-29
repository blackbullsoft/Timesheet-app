import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const LoadingAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animation.json")}
        autoPlay
        loop
        style={styles.animation}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: screenWidth,
    // height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: "60%", 
    height: "60%",
  },
});

export default LoadingAnimation;


