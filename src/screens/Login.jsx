import {
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import dataResponse from "../utils/dataResponse";
import { useDispatch } from "react-redux";

export default function Login() {
  const [component, setComponent] = useState("Entrar");
  const dispatch = useDispatch();

  useEffect(() => {
    dataResponse(dispatch);
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.login}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
          <Text style={styles.title}>Hola,</Text>
          <Text style={styles.title}>Inicia sesión</Text>

          <View style={styles.boxText}>
            <TouchableOpacity onPress={() => setComponent("Entrar")}>
              <Text
                style={[
                  styles.btnText,
                  {
                    color: component === "Entrar" ? colores.primary : "#C1C1C1",
                  },
                ]}
              >
                Entrar{" "}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.btnText, { color: "#6D6E6F" }]}>/</Text>
            <TouchableOpacity onPress={() => setComponent("Registrarme")}>
              <Text
                style={[
                  styles.btnText,
                  {
                    color: component !== "Entrar" ? colores.primary : "#C1C1C1",
                  },
                ]}
              >
                {" "}
                Registrarme
              </Text>
            </TouchableOpacity>
          </View>

          {component === "Entrar" ? <Entrar /> : <Registrarme />}
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  btnText: {
    marginTop: heightPercentageToDP(2),
    fontFamily: "Poppins_500Medium",
    fontSize: tamaño_texto.medium,
  },
  boxText: {
    flexDirection: "row",
  },
});
