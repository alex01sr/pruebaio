import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { SvgUri } from "react-native-svg";
import { colores, tamaño_texto } from "../utils/material";
import Entrar from "../components/Entrar";
import Registrarme from "../components/Registrarme";
import BotonComponent from "../components/BotonComponent";
import CardComunidades from "../components/CardComunidades";
import { useSelector } from "react-redux";
import socialApp from "../api/socialApp";
import { toastGenerate } from "../utils/ToastGenerate";

export default function ActualizaComunidad({ navigation, route }) {
  const [comunidadesSelect, setComunidadesSelect] = useState([]);
  const { comunidades } = useSelector((state) => state);
  console.log(comunidades);
  const handleSubmit = async () => {
    navigation.navigate({
      name: route.params.id === "post" ? "Post" : "Perfil",
      params: { comunidadesSelect },
      merge: true,
    });
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.comunidades) {
        setComunidadesSelect(route.params.comunidades);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        {/*   <Image style={styles.logo} source={require("../../assets/logo.png")} /> */}
        <Text style={styles.title}>Selecciona</Text>
        <Text style={styles.title}>tus comunidades</Text>
        <View style={{}}>
          {/*    <ScrollView
              style={{ maxWidth: widthPercentageToDP(90) }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
  
            > */}
          <FlatList
            style={{
              marginTop: heightPercentageToDP(2),
              maxHeight: heightPercentageToDP(55),
              maxWidth: widthPercentageToDP(90),
            }}
            data={comunidades}
            renderItem={(comunidad, i) => {
              return (
                <CardComunidades
                  key={i}
                  comunidad={comunidad.item}
                  comunidadesSelect={{
                    comunidadesSelect,
                    setComunidadesSelect,
                  }}
                  limit={route.params.id === "post" ? true : false}
                  numberLimit={1}
                />
              );
            }}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            /*     scrollEnabled={false} */
          />
          {/*    </ScrollView> */}
        </View>
      </View>
      <BotonComponent
        funcion={handleSubmit}
        label="Guardar"
        width={80}
        style={{
          marginTop: heightPercentageToDP(5),
          position: "absolute",
          bottom: heightPercentageToDP(15),
        }}
      />
      {console.log(comunidadesSelect)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  login: {
    marginTop: heightPercentageToDP(10),
    width: widthPercentageToDP(90),
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: tamaño_texto.Elarge,
  },
  logo: {
    alignSelf: "center",
    width: widthPercentageToDP(60),
    height: widthPercentageToDP(30),
    resizeMode: "contain",
  },
});
