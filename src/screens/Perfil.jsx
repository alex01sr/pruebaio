import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import * as FileSystem from "expo-file-system";
import { colores, tamaño_texto } from "../utils/material";
import InputComponent from "../components/InputComponent";
import { handleChange } from "../utils/function";
import { URL_API } from "@env";
import {
  validateDescription,
  validateEmail,
  validateNumber,
  validateSitioWeb,
  validateString,
  validateStringAndNumber,
} from "../utils/Validate";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BotonComponent from "../components/BotonComponent";
import { useDispatch, useSelector } from "react-redux";
import { toastGenerate } from "../utils/ToastGenerate";
import socialApp from "../api/socialApp";
import { setDataUser, setJwt } from "../../redux/actions";
import * as ImagePicker from "expo-image-picker";
export default function Perfil({ navigation, route }) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageChange, setImageChange] = useState(false);

  const [acceso, setAcceso] = useState({
    username: "",
    email: "",
    password: "",
    nombre_marca: "",
    numero_celular: "",
    ubicacion_direccion: "",
    sitio_web: "",

    descripcion_bio: "",
  });
  const [error, setError] = useState({});
  const { data, jwt } = useSelector((state) => state);
  const { comunidades } = data;
  const [image, setImage] = useState();
  const consultarData = () => {
    const {
      email,
      nombre_marca,
      numero_celular,
      ubicacion_direccion,
      username,
      descripcion_bio,
      sitio_web,
      avatar,
    } = data;

    if (avatar) {
      setImage(avatar.formats.medium.url);
    }
    setAcceso({
      email,
      nombre_marca,
      numero_celular,
      ubicacion_direccion,
      username,
      descripcion_bio,
      sitio_web,
    });
  };
  const dispatch = useDispatch();
  const actualizarDatos = async () => {
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

      let aux = acceso;

      if (route.params) {
        aux.comunidades = route.params.comunidadesSelect;
      }
      console.log(aux);
      await socialApp.put(`/users/me`, aux, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      {
      }

      if (imageChange) {
        let uploading = await FileSystem.uploadAsync(
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

        if (uploading.status === 200) {
          toastGenerate("Foto registrada correctamente");
        } else {
          console.log(uploading);
          toastGenerate("Fallo al subir la foto");
        }
      }

      let response = await socialApp.get(`/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch(setDataUser(response.data));

      toastGenerate("Informacion actualizada correctamente");
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

  const tomarFoto = async () => {
    if (!status.granted) {
      requestPermission();
      return;
    }
    let image = await ImagePicker.launchCameraAsync();

    if (!image.canceled) {
      setImageChange(true);
      setImage(image.assets[0].uri);
    }
    console.log(image);
  };

  const misComunidades = () => {
    let aux = comunidades.map((comunidad) => {
      return comunidad.id;
    });
    console.log(aux);
    navigation.navigate("ActualizaComunidad", { comunidades: aux });
  };

  useEffect(() => {
    consultarData();
  }, []);
  return (
    <KeyboardAwareScrollView style={{ marginBottom: heightPercentageToDP(15) }}>
      <View style={styles.container}>
        <View style={styles.login}>
          <Text style={styles.title}>Perfil</Text>

          {image ? (
            <TouchableOpacity onPress={tomarFoto}>
              <Image
                style={styles.avatar}
                source={{ uri: imageChange ? image : `${URL_API}${image}` }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={tomarFoto} style={styles.imagenBox} />
          )}

          <Text style={styles.txtNombre}>{acceso.nombre_marca}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {comunidades?.map((comunidad, i) => {
              return (
                <Text key={i} style={styles.txtCategoria}>
                  {comunidad.titulo} {comunidades.length - 1 !== i && " | "}
                </Text>
              );
            })}
          </View>

          <View style={styles.boxPublicaciones}>
            <View style={styles.viewPublicaciones}>
              <Text style={styles.txtTitlePubli}>Publicaciones</Text>
              <Text style={styles.txtContentPubli}>
                {data?.posts?.length}
                {data.posts.length > 1000 && "K"}
              </Text>
            </View>
            <View style={styles.viewPublicaciones}>
              <Text style={styles.txtTitlePubli}>Reacciones</Text>
              <Text style={styles.txtContentPubli}>0K</Text>
            </View>
          </View>
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
            width={80}
            msgError="Por favor ingresa un nickname valido"
          />
          <InputComponent
            value={acceso.nombre_marca}
            width={80}
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
            msgError="Por favor ingresa un nombre valido"
          />
          <InputComponent
            width={80}
            value={acceso.email}
            placeholder="Email"
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
            msgError="Por favor ingresa un email valido"
          />
          <InputComponent
            width={80}
            value={acceso.numero_celular}
            placeholder="Celular"
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
            msgError="Por favor ingresa un celular valido"
          />
          <InputComponent
            width={80}
            value={acceso.ubicacion_direccion}
            placeholder="Direccion"
            funcion={(e) =>
              handleChange(
                e,
                validateStringAndNumber,
                setAcceso,
                acceso,
                "ubicacion_direccion",
                setError,
                error
              )
            }
            error={error.ubicacion_direccion}
            msgError="Por favor ingresa una direccion valida"
          />
          <InputComponent
            width={80}
            value={acceso.sitio_web}
            placeholder="Sitio Web"
            funcion={(e) =>
              handleChange(
                e,
                validateSitioWeb,
                setAcceso,
                acceso,
                "sitio_web",
                setError,
                error
              )
            }
            error={error.sitio_web}
            msgError="Por favor ingresa un sitio web valido"
          />
          <InputComponent
            width={80}
            multiline
            value={acceso.descripcion_bio}
            placeholder="Bio"
            funcion={(e) =>
              handleChange(
                e,
                validateDescription,
                setAcceso,
                acceso,
                "descripcion_bio",
                setError,
                error
              )
            }
            error={error.descripcion_bio}
            msgError="Por favor sin caracteres especiales"
          />
          <BotonComponent
            funcion={misComunidades}
            label="Mis Comunidades"
            style={{ marginTop: heightPercentageToDP(5) }}
          />
          <BotonComponent
            funcion={actualizarDatos}
            label="Guardar"
            style={{ marginTop: heightPercentageToDP(5) }}
          />
          <BotonComponent
            funcion={() => {
              navigation.replace("Login");
              dispatch(setDataUser({}));
              dispatch(setJwt({}));
            }}
            label="Cerrar Sesion"
            style={{ marginTop: heightPercentageToDP(5) }}
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
  login: {
    marginTop: heightPercentageToDP(5),
    width: widthPercentageToDP(90),
    alignItems: "center",
  },
  title: {
    marginTop: heightPercentageToDP(2),
    fontFamily: "Poppins_500Medium",
    fontSize: tamaño_texto.medium,
  },
  imagenBox: {
    width: widthPercentageToDP(30),
    height: widthPercentageToDP(30),
    backgroundColor: "#d8d8d8",
    borderRadius: 100,
    marginTop: heightPercentageToDP(3),
    borderColor: colores.secondary,
    borderWidth: 5,
  },
  avatar: {
    width: widthPercentageToDP(30),
    height: widthPercentageToDP(30),
    marginTop: heightPercentageToDP(3),
    borderColor: colores.secondary,
    borderWidth: 5,
    resizeMode: "cover",
    borderRadius: 100,
  },
  boxPublicaciones: {
    marginTop: heightPercentageToDP(2),
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(10),
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 15,
  },
  viewPublicaciones: {
    alignItems: "center",
    justifyContent: "center",
  },
  txtNombre: {
    fontFamily: "Poppins_500Medium",
    fontSize: tamaño_texto.medium,
    color: "#3A3D3F",
  },
  txtCategoria: {
    fontFamily: "Poppins_500Medium",
    fontSize: tamaño_texto.Esmall,
    color: "#A3A3A3",
  },
  txtTitlePubli: {
    fontFamily: "Poppins_500Medium",
    fontSize: tamaño_texto.Esmall,
    color: "#A3A3A3",
  },
  txtContentPubli: {
    fontFamily: "Poppins_500Medium",
    fontSize: tamaño_texto.Esmall,
    color: "#3A3D3F",
  },
});
