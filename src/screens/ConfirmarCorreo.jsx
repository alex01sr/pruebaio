import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { colores, tamaño_texto } from "../utils/material";
import InputComponent from "../components/InputComponent";
import BotonComponent from "../components/BotonComponent";
import { toastGenerate } from "../utils/ToastGenerate";
import socialApp from "../api/socialApp";
import { handleChange } from "../utils/function";
import { validateCod } from "../utils/Validate";

export default function ConfirmarCorreo({ navigation }) {
  const [acceso, setAcceso] = useState({
    code: "",
  });
  const [error, setError] = useState({});

  const handleSubmit = async () => {
    for (const element in error) {
      if (error[element]) {
        toastGenerate(`Por favor revisa la adveretencia del campo ${element}`);

        return;
      }
    }

    for (const campo in acceso) {
      if (!acceso[campo]) {
        toastGenerate(`El campo ${campo} es obligatorio`);

        return;
      }
    }

    try {
      let response = await socialApp.get(
        `/auth/email-confirmation?confirmation=${acceso.code}`
      );
      toastGenerate("Cuenta activada correctamente, ya puedes iniciar sesion");
      navigation.popToTop();
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
      <Image
        style={styles.logo}
        source={require("../../assets/logotrasparente.png")}
      />
      <View style={styles.confirmar}>
        <Text style={styles.title}>Código{"\n"}de confirmación</Text>
        <Text style={styles.text}>
          Por favor ingresa el código enviado a tu email o celular para validar
          el registro de tu cuenta
        </Text>
        <InputComponent
          placeholder="Codigo"
          width={80}
          style={{ marginVertical: heightPercentageToDP(5) }}
          funcion={(e) =>
            handleChange(
              e,
              validateCod,
              setAcceso,
              acceso,
              "code",
              setError,
              error
            )
          }
          error={error.code}
          msgError="Por favor ingresa un codigo de 6 digitos"
        />
        <BotonComponent
          funcion={handleSubmit}
          type="secondary"
          label="VALIDAR REGISTRO"
          width={80}
          style={{
            marginTop: heightPercentageToDP(5),
            position: "absolute",
            bottom: heightPercentageToDP(10),
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.primary,
    alignItems: "center",
  },
  confirmar: {
    flex: 1,

    marginTop: heightPercentageToDP(20),
    width: widthPercentageToDP(80),
  },
  logo: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(20),
    position: "absolute",
    resizeMode: "cover",
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: tamaño_texto.Elarge,
    color: "#fff",
  },
  text: {
    textAlign: "justify",
    fontFamily: "Poppins_500Medium",
    fontSize: tamaño_texto.medium,
    color: "#fff",
  },
});
