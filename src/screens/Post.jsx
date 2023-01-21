import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import InputComponent from "../components/InputComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BotonComponent from "../components/BotonComponent";
import { useSelector } from "react-redux";
import { colores, tamaño_texto } from "../utils/material";
import Carousel from "../components/Carousel";
import { handleChange } from "../utils/function";
import { validateDescription } from "../utils/Validate";
import { URL_API } from "@env";
import { toastGenerate } from "../utils/ToastGenerate";
import * as FileSystem from "expo-file-system";
import socialApp from "../api/socialApp";
export default function Post({ route, navigation }) {
  const { image, location } = route.params;
  const { comunidades, jwt, data } = useSelector((state) => state);
  const [acceso, setAcceso] = useState({
    mensaje: "",
  });
  const [error, setError] = useState({});

  const subirPost = async () => {
    try {
      for (const element in error) {
        if (error[element]) {
          toastGenerate(
            `Por favor revisa la adveretencia del campo ${element}`
          );

          return;
        }
      }

      for (const campo in acceso) {
        if (!acceso[campo]) {
          toastGenerate(`El campo ${campo} es obligatorio`);

          return;
        }
      }
      if (!route.params.comunidadesSelect) {
        toastGenerate("Seleccione una comunidad");
        return;
      }
      console.log(
        acceso.mensaje,
        acceso.mensaje,
        location.latitude,
        location.longitude,
        data.id,
        route.params?.comunidadesSelect[0]
      );
      let post = await socialApp.post(
        `/posts`,
        {
          data: {
            descripcion: acceso.mensaje,
            titulo: acceso.mensaje,
            ubicacion_latitud: `${location.latitude}`,
            ubicacion_longitud: `${location.longitude}`,
            autor: data.id,
            anonimo: false,
            ubicacion_direccion: "anonima",
            comunidad: route.params?.comunidadesSelect[0],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(post.data.data.id);

      let uploadMedia = image?.map((e) => {
        return FileSystem.uploadAsync(
          `${URL_API}/api/upload`,
          e.uri,

          {
            headers: { Authorization: `Bearer ${jwt}` },
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            parameters: {
              path: "media",
              refId: post.data.data.id,
              ref: "api::post.post",
              field: "media",
            },
            fieldName: "files",
          }
        );
      });

      await Promise.all(uploadMedia);
      /*   let uploading = await FileSystem.uploadAsync(
        `${URL_API}/api/upload`,
        image,

        {
          headers: { Authorization: `Bearer ${jwt}` },
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          parameters: {
            path: "profiles",
            refId: data.id,
            ref: "plugin::users-permissions.user",
            field: "avatar",
          },
          fieldName: "files",
        }
      ); 
 */
      /*      if (uploading.status === 200) {
        toastGenerate("Foto registrada correctamente");
      } else {
        console.log(uploading);
        toastGenerate("Fallo al subir la foto");
      } */
      navigation.popToTop();
      toastGenerate("Post creado correctamente");
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
        <View style={styles.post}>
          <Carousel data={image} />

          <InputComponent
            title={false}
            style={{
              height: heightPercentageToDP(20),
            }}
            width={90}
            multiline
            placeholder="Escribe tu mensaje"
            funcion={(e) =>
              handleChange(
                e,
                validateDescription,
                setAcceso,
                acceso,
                "mensaje",
                setError,
                error
              )
            }
            error={error.mensaje}
            msgError="Por favor sin caracteres especiales"
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ActualizaComunidad", { id: "post" })
            }
          >
            <Text style={styles.title}>Elige una comunidad</Text>

            {route.params.comunidadesSelect?.map((elem, i) => {
              let name = comunidades.find((e) => e.id === elem);

              return (
                <Text
                  style={[styles.title, { color: colores.secondary }]}
                  key={i}
                >
                  {name.titulo}
                </Text>
              );
            })}
          </TouchableOpacity>
          <BotonComponent
            label="Confirmar"
            width={50}
            funcion={subirPost}
            type="primary"
            style={{
              marginTop: heightPercentageToDP(5),
            }}
          />
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
  post: {
    marginTop: heightPercentageToDP(10),
    width: widthPercentageToDP(90),
    alignItems: "center",
  },
  image: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(30),
    resizeMode: "cover",
    borderRadius: 20,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: tamaño_texto.Esmall,
    color: colores.primary,
    alignSelf: "center",
  },
});
