import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { colores, tamaño_texto } from "../utils/material";
import InputComponent from "./InputComponent";
import BotonComponent from "./BotonComponent";
import { handleChange } from "../utils/function";
import { validateEmail, validatePassword } from "../utils/Validate";
import socialApp from "../api/socialApp";
import { toastGenerate } from "../utils/ToastGenerate";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setDataUser, setJwt } from "../../redux/actions";
import * as SecureStore from "expo-secure-store";
export default function Entrar() {
  const [acceso, setAcceso] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
      let aux = acceso;
      console.log(acceso);
      if (aux.email.charAt(aux.email.length - 1) === " ") {
        aux.email = aux.email.slice(0, aux.email.length - 1);
      }

      let response = await socialApp.post(`/auth/local`, {
        identifier: aux.email,
        password: aux.password,
      });

      await SecureStore.setItemAsync("jwt", response.data.jwt);

      console.log(response.data);

      navigation.replace("Loading");
      toastGenerate("Inicio de sesion exitoso");
    } catch (error) {
      console.log(error.response);

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
      <InputComponent
        placeholder="E-mail"
        funcion={(e) =>
          handleChange(
            e,
            validateEmail,
            setAcceso,
            acceso,
            "email",
            setError,
            error
          )
        }
        error={error.email}
        msgError="Por favor ingresa un correo valido"
      />

      <InputComponent
        placeholder="Contraseña"
        funcion={(e) =>
          handleChange(
            e,
            validatePassword,
            setAcceso,
            acceso,
            "password",
            setError,
            error
          )
        }
        error={error.password}
        msgError="Por favor ingresa una contraseña de 8 digitos con minimo una mayuscula"
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("RecuperarContrasena")}
      >
        <Text style={styles.olvido}>¿Olvidó su contraseña?</Text>
      </TouchableOpacity>

      <BotonComponent
        funcion={handleSubmit}
        label="Entrar"
        style={{ marginTop: heightPercentageToDP(5) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentageToDP(5),
  },
  olvido: {
    color: "#6D6E6F",
    fontFamily: "Poppins_500Medium",
    fontSize: tamaño_texto.small,
  },
});
