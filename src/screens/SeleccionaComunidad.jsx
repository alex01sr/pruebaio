import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
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

export default function SeleccionaComunidad({ navigation, route }) {
  const [comunidadesSelect, setComunidadesSelect] = useState([]);
  const { comunidades } = useSelector((state) => state);
  console.log(comunidades);
  const handleSubmit = async () => {
    try {
      const { acceso } = route.params;
      let aux = acceso;
      console.log(acceso);
      if (aux.email.charAt(aux.email.length - 1) === " ") {
        aux.email = aux.email.slice(0, aux.email.length - 1);
      }

      const data = { ...acceso, comunidades: comunidadesSelect };
      console.log(data);
      let response = await socialApp.post(`/auth/local/register-user`, {
        ...acceso,
        comunidades: comunidadesSelect,
      });
      navigation.replace("ConfirmarCorreo");
      toastGenerate("Registro exitoso");
    } catch (error) {
      console.log(error);

      toastGenerate(
        error.response ? error.response.data.error.message : "Error server"
      );

      console.log(
        error.response ? error.response.data.error.message : "Error server"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
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
        label="Continuar"
        width={80}
        style={{
          marginTop: heightPercentageToDP(5),
          position: "absolute",
          bottom: heightPercentageToDP(5),
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
