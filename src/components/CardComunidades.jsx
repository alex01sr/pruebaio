import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { colores, tamaño_texto } from "../utils/material";
import { URL_API } from "@env";
import { toastGenerate } from "../utils/ToastGenerate";
export default function CardComunidades({
  comunidadesSelect,
  comunidad,
  limit = false,
  numberLimit = 1,
}) {
  const [state, setState] = useState(false);
  const { comunidadesSelect: comunidadSeleccionar, setComunidadesSelect } =
    comunidadesSelect;
  const { titulo, id, imagen } = comunidad;

  useEffect(() => {
    console.log(comunidadSeleccionar, "desde card");
    if (comunidadSeleccionar.includes(id)) {
      setState(true);
    } else {
      setState(false);
    }
  }, [comunidadSeleccionar]);

  const agregar = () => {
    if (limit) {
      if (comunidadSeleccionar.length >= numberLimit) {
        toastGenerate(`Solo puedes agregar ${numberLimit}`);
        return;
      }
    }
    setComunidadesSelect([...comunidadSeleccionar, id]);
  };
  const eliminar = () => {
    let aux = comunidadSeleccionar.filter((e) => e !== id);

    setComunidadesSelect(aux);
  };
  return (
    <View style={styles.view}>
      <Text style={styles.title}>{titulo}</Text>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: state ? colores.secondary : "#F5F5F5",
            borderColor: state ? colores.primary : "#F5F5F5",
          },
        ]}
        onPress={() => (state ? eliminar() : agregar())}
      >
        <Image
          style={styles.container}
          source={{ uri: `${URL_API}${imagen}` }}
        />
        <View
          style={[
            styles.boxSelect,
            {
              backgroundColor: state ? `${colores.secondary}80` : "transparent",
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginHorizontal: widthPercentageToDP(7.5),
    marginVertical: heightPercentageToDP(2),
  },

  container: {
    width: widthPercentageToDP(30),
    height: widthPercentageToDP(30),
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F5F5F5",
    borderRadius: 15,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: tamaño_texto.medium,
    color: colores.primary,
  },
  imagen: {
    width: widthPercentageToDP(30),
    height: widthPercentageToDP(30),
    resizeMode: "contain",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
  },
  boxSelect: {
    width: widthPercentageToDP(30),
    height: widthPercentageToDP(30),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    position: "absolute",
  },
});
