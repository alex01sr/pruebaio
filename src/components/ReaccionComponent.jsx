import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { URL_API } from "@env";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function ReaccionComponent({ reaccion, index, select }) {
  const translate = useSharedValue(0);
  const reaccionStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translate.value }],
    };
  });

  useEffect(() => {
    if (index === select) {
      translate.value = withSpring(-50);
    } else {
      translate.value = withSpring(0);
    }
  }, [select]);

  return (
    <Animated.View
      style={[
        reaccionStyles,
        {
          width: widthPercentageToDP(15),
          height: widthPercentageToDP(15),
          /*   backgroundColor: select === i ? "gray" : "transparent", */
        },
      ]}
    >
      <Image
        source={{
          uri: `${URL_API}${reaccion.attributes.imagen.data.attributes.formats.small.url}`,
        }}
        style={{
          width: widthPercentageToDP(15),
          height: widthPercentageToDP(15),
          resizeMode: "contain",
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
