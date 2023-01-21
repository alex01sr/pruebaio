import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { tamaño_texto } from "../utils/material";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
      <Text style={styles.title}>Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    alignSelf: "center",

    fontFamily: "Poppins_700Bold",
    fontSize: tamaño_texto.medium,
    color: "#3A3D3F",
  },
  image: {
    alignSelf: "flex-start",
    width: widthPercentageToDP(20),
    height: widthPercentageToDP(10),
    resizeMode: "contain",
  },
});
