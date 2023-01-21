import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { colores, tamaño_texto } from "../utils/material";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function InputComponent({
  value,
  placeholder,
  width = 90,
  style,
  funcion = () => {},
  msgError,
  error = false,
  multiline = false,
  title = true,
}) {
  return (
    <View style={{ width: widthPercentageToDP(width) }}>
      {title && <Text style={styles.placeholder}>{placeholder}</Text>}
      <TextInput
        multiline={multiline}
        value={value}
        style={[styles.input, style, { width: widthPercentageToDP(width) }]}
        selectionColor={colores.primary}
        placeholder={placeholder}
        onChangeText={funcion}
      />
      {error && <Text style={styles.error}>{msgError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: heightPercentageToDP(1),
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    paddingHorizontal: widthPercentageToDP(5),

    width: widthPercentageToDP(90),
    height: heightPercentageToDP(5),
    fontFamily: "Poppins_500Medium",
    color: colores.primary,
  },
  error: {
    color: "#FF7878",
    fontFamily: "Poppins_500Medium",
    fontSize: tamaño_texto.Esmall,
    marginBottom: heightPercentageToDP(1),
  },
  placeholder: {
    fontFamily: "Poppins_500Medium",
    fontSize: tamaño_texto.Esmall,
    color: colores.primary,
    alignSelf: "flex-start",
  },
});
