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
import { handleChange } from "../utils/function";
import {
  validateCod,
  validateEmail,
  validatePassword,
} from "../utils/Validate";
import { toastGenerate } from "../utils/ToastGenerate";
import InputComponent from "../components/InputComponent";
import BotonComponent from "../components/BotonComponent";
import socialApp from "../api/socialApp";

export default function RecuperarContrasena({ navigation }) {
  const dispatch = useDispatch();
  const [acceso, setAcceso] = useState({ email: "" });
  const [nuevaData, setNuevaData] = useState({ code: "", password: "" });
  const [errorAcceso, setErrorAcceso] = useState({});
  const [errorNuevaData, setErrorNuevaData] = useState({});
  const [flag, setFlag] = useState(false);
  const handleSubmit = async () => {
    for (const element in errorAcceso) {
      if (errorAcceso[element]) {
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
      let aux = acceso;

      if (aux.email.charAt(aux.email.length - 1) === " ") {
        aux.email = aux.email.slice(0, aux.email.length - 1);
      }

      let response = await socialApp.post(`/auth/forgot-password`, {
        email: aux.email,
      });
      setFlag(true);
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

  const handleChandePassword = async () => {
    for (const element in errorNuevaData) {
      if (errorNuevaData[element]) {
        toastGenerate(`Por favor revisa la adveretencia del campo ${element}`);

        return;
      }
    }

    for (const campo in nuevaData) {
      if (!nuevaData[campo]) {
        toastGenerate(`El campo ${campo} es obligatorio`);

        return;
      }
    }

    try {
      let response = await socialApp.post(
        `/auth/reset-password?code=${nuevaData.code}`,
        {
          code: nuevaData.code,
          password: nuevaData.password,
          passwordConfirmation: nuevaData.password,
        }
      );
      toastGenerate("Se recupero la contraseña correctamente");
      navigation.goBack();
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
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.login}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
          <Text style={styles.title}>Hola,</Text>
          <Text style={styles.title}>Recupera tu contraseña</Text>
          <InputComponent
            value={acceso.email}
            placeholder="Correo electrónico:"
            widthSize={widthPercentageToDP(90)}
            rounded="medium"
            funcion={(e) =>
              handleChange(
                e,
                validateEmail,
                setAcceso,
                acceso,
                "email",
                setErrorAcceso,
                errorAcceso
              )
            }
            error={errorAcceso.email}
            msgError="Ingrese un email valido"
          />
          <BotonComponent
            funcion={handleSubmit}
            label="Continuar"
            style={{ marginTop: heightPercentageToDP(5) }}
          />
          {flag && (
            <>
              <Text style={styles.title}>
                Revisa tu correo y agrega aquí el código de confirmación
              </Text>
              <View style={styles.campos}>
                <InputComponent
                  value={nuevaData.code}
                  type="secondary"
                  size="large"
                  placeholder="Codigo:"
                  widthSize={widthPercentageToDP(90)}
                  rounded="medium"
                  funcion={(e) =>
                    handleChange(
                      e,
                      validateCod,
                      setNuevaData,
                      nuevaData,
                      "code",
                      setErrorNuevaData,
                      errorNuevaData
                    )
                  }
                  error={errorNuevaData.code}
                  msgError="Ingrese un codigo valido"
                />

                <InputComponent
                  type="secondary"
                  size="large"
                  password={true}
                  placeholder="Nueva Contraseña:"
                  widthSize={widthPercentageToDP(90)}
                  rounded="medium"
                  funcion={(e) =>
                    handleChange(
                      e,
                      validatePassword,
                      setNuevaData,
                      nuevaData,
                      "password",
                      setErrorNuevaData,
                      errorNuevaData
                    )
                  }
                  error={errorNuevaData.password}
                  msgError="Ingrese una contraseña valida"
                />
              </View>
              <BotonComponent
                funcion={handleChandePassword}
                label="Continuar"
                style={{ marginTop: heightPercentageToDP(5) }}
              />
            </>
          )}
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
    marginVertical: heightPercentageToDP(1),
    fontFamily: "Poppins_700Bold",
    fontSize: tamaño_texto.large,
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
  campos: {
    alignItems: "center",
    marginTop: heightPercentageToDP(5),
  },
});
