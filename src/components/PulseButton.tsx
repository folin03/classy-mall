import React, { useState, useEffect } from "react";
import { Animated, StyleSheet, Easing } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "../constants/colors";

interface IPulseButtonProps {
  shouldPulse: boolean;
  position: string;
  onPress: () => void;
}

const PulseButton = ({ shouldPulse, position, onPress }: IPulseButtonProps) => {
  const [circleScale, setCircleScale] = useState(new Animated.Value(0.01));
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  const PulseAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(circleScale, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(circleScale, {
        toValue: 0.01,
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 0.2,
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ])
  );

  useEffect(() => {
    if (shouldPulse) {
      PulseAnimation.start();
    } else {
      PulseAnimation.stop();
      setCircleScale(new Animated.Value(0.01));
      setOpacity(new Animated.Value(0.2));
    }
  }, [shouldPulse]);

  return (
    <Animated.View style={[styles.upButton, { opacity: 0.99, zIndex: 10 }]}>
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ scale: circleScale }], opacity }
        ]}
      />
      <MaterialIcons
        name="chevron-right"
        style={{
          zIndex: 10,
          transform: [{ rotate: position === "left" ? "90deg" : "270deg" }]
        }}
        size={40}
        color="white"
        onPress={onPress}
      />
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    backgroundColor: "white",
    zIndex: -1,
    borderRadius: 50,
    height: 50,
    width: 50
  },
  upButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 300,
    right: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
});

export default PulseButton;