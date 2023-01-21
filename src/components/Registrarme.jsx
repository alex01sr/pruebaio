import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { colores, tamaño_texto } from "../utils/material";
import InputComponent from "./InputComponent";
import BotonComponent from "./BotonComponent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  validateEmail,
  validateNumber,
  validatePassword,
  validateString,
  validateStringAndNumber,
} from "../utils/Validate";
import { handleChange } from "../utils/function";
import { toastGenerate } from "../utils/ToastGenerate";
import socialApp from "../api/socialApp";

export default function Registrarme() {
  const [acceso, setAcceso] = useState({
    email: "",
    password: "",
    username: "",
    numero_celular: "",
    nombre_marca: "",
  });
  const [error, setError] = useState({});
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
    setAcceso({
      email: "",
      password: "",
      username: "",
      numero_celular: "",
      nombre_marca: "",
    });
    navigation.navigate("SeleccionaComunidad", { acceso });
  };

  return (
    <View style={styles.container}>
      {console.log(acceso)}
      <InputComponent
        value={acceso.email}
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
        value={acceso.username}
        placeholder="Nickname"
        funcion={(e) =>
          handleChange(
            e,
            validateStringAndNumber,
            setAcceso,
            acceso,
            "username",
            setError,
            error
          )
        }
        error={error.username}
        msgError="Por favor ingresa un correo valido"
      />
      <InputComponent
        value={acceso.nombre_marca}
        placeholder="Nombre o marca"
        funcion={(e) =>
          handleChange(
            e,
            validateString,
            setAcceso,
            acceso,
            "nombre_marca",
            setError,
            error
          )
        }
        error={error.nombre_marca}
        msgError="Por favor ingresa un nmmbre sin numeros ni caracteres especiales"
      />

      <InputComponent
        value={acceso.numero_celular}
        placeholder="Número celular"
        funcion={(e) =>
          handleChange(
            e,
            validateNumber,
            setAcceso,
            acceso,
            "numero_celular",
            setError,
            error
          )
        }
        error={error.numero_celular}
        msgError="Por favor ingresa un numero valido"
      />

      <InputComponent
        value={acceso.password}
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

      <BotonComponent
        funcion={handleSubmit}
        label="Continuar"
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
