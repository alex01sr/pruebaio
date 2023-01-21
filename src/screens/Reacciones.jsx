import { StyleSheet, Text, View, Image, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import ReaccionComponent from "../components/ReaccionComponent";
const data = [
  { nombre: "risa", img: require("../../assets/risa.png") },
  {
    nombre: "sorprendido",
    img: require("../../assets/sorprendido.png"),
  },
  { nombre: "encanta", img: require("../../assets/encanta.png") },
  { nombre: "enojado", img: require("../../assets/enojado.png") },
];
export default function Reacciones({ see, scale, select }) {
  const { reacciones } = useSelector((state) => state);
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  /*  const funcionPrueba = (e) => {
    return useAnimatedStyle(() => {
      return {
        transform: [{ translateY: e === select ? offset.value : 0 }],
      };
    });
  }; */

  const backStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: 0 }],
    };
  });

  /*  useEffect(() => {
    console.log(select);

    offset.value = withSpring(-50);
  }, [select]); */

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]}>
        {reacciones?.slice(0, 4).map((reaccion, i) => {
          /*  console.log(
            icono.attributes.imagen.data.attributes.formats.small.url
          ); */
          return (
            <ReaccionComponent
              key={i}
              reaccion={reaccion}
              index={i}
              select={select}
            />
          );
        })}
      </Animated.View>
      {/*   <Button
        onPress={() => (offset.value = withSpring(offset.value === 0 ? 1 : 0))}
        title="Reaccion"
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    flexDirection: "row",
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(7),
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
