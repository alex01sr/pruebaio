import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { colores, tamaño_texto } from "../utils/material";

export default function BotonComponent({
  label,
  style,
  funcion = () => {},
  width = 90,
  type = "primary",
}) {
  return (
    <TouchableOpacity
      style={[
        type === "primary" ? styles.btn : styles.btnwhite,
        style,
        { width: widthPercentageToDP(width) },
      ]}
      onPress={funcion}
    >
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={[
          styles.btnText,
          { color: type === "primary" ? "#fff" : colores.primary },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(5),
    backgroundColor: colores.secondary,
    borderRadius: 24,
  },
  btnwhite: {
    alignItems: "center",
    justifyContent: "center",
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(5),
    backgroundColor: "#fff",
    borderRadius: 24,
  },
  btnText: {
    color: "#fff",
    fontFamily: "Poppins_500Medium",
    fontSize: tamaño_texto.large,
  },
});
