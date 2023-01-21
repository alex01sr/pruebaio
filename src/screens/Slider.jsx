import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, SafeAreaView, Animated } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import BotonComponent from "../components/BotonComponent";
import * as SecureStore from "expo-secure-store";
const imagenes = [
  require("../../assets/sun.png"),

  require("../../assets/sun-lo.png"),
];

const ESPACIO_CONTENEDOR = widthPercentageToDP(90);
const ESPACIO_LATERAL = (widthPercentageToDP(100) - ESPACIO_CONTENEDOR) / 2;
const ESPACIO = 13;
const ALTURA_BACKDROP = heightPercentageToDP(50);
function BackDrop({ scrollX }) {
  return (
    <View
      style={
        ([
          {
            height: heightPercentageToDP(50),
            width: widthPercentageToDP(100),
            position: "absolute",
            top: 0,
          },
        ],
        StyleSheet.absoluteFillObject)
      }
    >
      {imagenes.map((imagen, index) => {
        const inputRange = [
          (index - 1) * ESPACIO_CONTENEDOR,
          index * ESPACIO_CONTENEDOR,
          (index + 1) * ESPACIO_CONTENEDOR,
        ];

        const outputRange = [0, 1, 0];
        const opacity = scrollX.interpolate({ inputRange, outputRange });

        return (
          <Animated.Image
            source={imagen}
            key={index}
            blurRadius={10}
            style={[
              {
                height: ALTURA_BACKDROP,
                width: widthPercentageToDP(100),
                position: "absolute",
                top: 0,
                opacity: opacity,
              },
            ]}
          />
        );
      })}

      <LinearGradient
        colors={["transparent", "white"]}
        style={{
          height: ALTURA_BACKDROP,
          width: widthPercentageToDP(100),
          position: "absolute",
          top: 0,
        }}
      />
    </View>
  );
}
export default function Slider({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const continuar = async () => {
    try {
      await SecureStore.setItemAsync("tutorial_see", "true");
      navigation.navigate("MenuInferior");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackDrop scrollX={scrollX} />
      <StatusBar hidden />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        horizontal={true}
        //oculta la barra de indicacion
        showsHorizontalScrollIndicator={false}
        //modifica el contenedor
        contentContainerStyle={{
          paddingTop: heightPercentageToDP(10),
          paddingHorizontal: ESPACIO_LATERAL,
        }}
        //desacelera el carrusel
        decelerationRate={0}
        snapToInterval={ESPACIO_CONTENEDOR}
        scrollEventThrottle={16}
        data={imagenes}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ESPACIO_CONTENEDOR,
            index * ESPACIO_CONTENEDOR,
            (index + 1) * ESPACIO_CONTENEDOR,
          ];

          const outputRange = [0, -50, 0];
          const translateY = scrollX.interpolate({ inputRange, outputRange });

          return (
            <View
              key={index}
              style={{
                width: ESPACIO_CONTENEDOR,
                height: heightPercentageToDP(75),
                alignItems: "center",
                marginTop: heightPercentageToDP(1),
                paddingBottom: heightPercentageToDP(1),
              }}
            >
              <Animated.View
                style={{
                  alignItems: "center",
                  borderRadius: 34,
                  paddingTop: 10,
                  height: heightPercentageToDP(75),
                  width: widthPercentageToDP(75),
                  backgroundColor: "#000000",
                  transform: [{ translateY }],
                }}
              >
                <Image source={item} style={styles.posterImage} />
              </Animated.View>
              {index === imagenes.length - 1 && (
                <BotonComponent
                  label="Continuar"
                  width={50}
                  funcion={continuar}
                  type="primary"
                  style={{ position: "absolute", bottom: 0 }}
                />
              )}
              {console.log(index)}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  posterImage: {
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(70),
    borderRadius: 30,
    resizeMode: "contain",
  },
});
