import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { PanGestureHandler } from "react-native-gesture-handler";
import Reacciones from "../screens/Reacciones";
import { URL_API } from "@env";
import { FontAwesome } from "@expo/vector-icons";

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import dataResponse from "../utils/dataResponse";
import { useDispatch, useSelector } from "react-redux";
import socialApp from "../api/socialApp";
import { toastGenerate } from "../utils/ToastGenerate";
import { colores, tamaño_texto } from "../utils/material";
const tamano = widthPercentageToDP(20);
export default function Handler({ post, reaccionesPost, callback }) {
  const { reacciones, data, jwt } = useSelector((state) => state);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [state, setState] = useState("");
  const [flag, setFlag] = useState(false);
  const [actualizarReaccion, setActualizarReaccion] = useState({
    actualizar: false,
    id: "",
  });
  const aref = useRef(0);
  const scaleBox = useSharedValue(0);
  const dispatch = useDispatch();
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (e, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
      runOnJS(setFlag)(false);
    },
    onActive: (e, context) => {
      translateX.value = e.translationX + context.translateX;
      translateY.value = e.translationY + context.translateY;
      /*   setState(e.translationY + context.translateY); */
      console.log(translateX.value);
      if (-200 <= translateY.value) {
        if (0 <= translateX.value && translateX.value <= 83) {
          runOnJS(setState)(0);
        } else if (83 <= translateX.value && translateX.value <= 165) {
          runOnJS(setState)(1);
        } else if (165 <= translateX.value && translateX.value <= 248) {
          runOnJS(setState)(2);
        } else if (248 <= translateX.value && translateX.value <= 331) {
          runOnJS(setState)(3);
        }
      } else {
        runOnJS(setState)("");

        scaleBox.value = withSpring(0);
      }
      /* else {
        runOnJS(setState)(-1);
      } */
      scaleBox.value = withSpring(1);
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);

      /*  if (-200 <= translateY.value) { */
      runOnJS(setFlag)(true);
      /*   } */
      scaleBox.value = withSpring(0);
    },
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        /* { scale: scaleBox.value === 1 ? withSpring(0) : withSpring(1) }, */
      ],
    };
  });

  const scaleReacciones = useDerivedValue(() => {
    const formatedValue = scaleBox.value;
    return formatedValue;
  });
  const reaccionSelect = useDerivedValue(() => {
    const formatedValue = translateX.value;
    return formatedValue;
  });

  useEffect(() => {
    dataResponse(dispatch);
    comprobarReaccion();
  }, []);
  useEffect(() => {
    console.log("bandera", flag);
    if (flag) {
      reaccionFunction();
    }
  }, [flag]);

  const renderSelect = () => {
    const tam = 10;
    if (state === "") {
      return (
        <Animated.View
          style={[
            {
              width: widthPercentageToDP(tam),
              height: widthPercentageToDP(tam),
              /*   backgroundColor: select === i ? "gray" : "transparent", */
            },
          ]}
        >
          <Image
            source={require("../../assets/neutro.png")}
            style={{
              width: widthPercentageToDP(tam),
              height: widthPercentageToDP(tam),
              resizeMode: "contain",
            }}
          />
        </Animated.View>
      );
    }

    let reaccion = reacciones?.find((e) => e.id === state + 1);

    return (
      <Animated.View
        style={[
          {
            width: widthPercentageToDP(tam),
            height: widthPercentageToDP(tam),
            /*   backgroundColor: select === i ? "gray" : "transparent", */
          },
        ]}
      >
        <Image
          source={{
            uri: `${URL_API}${reaccion?.attributes.imagen.data.attributes.formats.small.url}`,
          }}
          style={{
            width: widthPercentageToDP(tam),
            height: widthPercentageToDP(tam),
            resizeMode: "contain",
          }}
        />
      </Animated.View>
    );
  };

  const reaccionFunction = async () => {
    try {
      console.log("eliminando parte 0");

      if (actualizarReaccion.actualizar) {
        console.log("eliminando parte 1");
        if (state === "") {
          console.log("eliminando");
          const reaccion = await socialApp.delete(
            `/reaccions/${actualizarReaccion.id}`,

            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          setActualizarReaccion({ actualizar: false, id: "" });
          callback();
          return;
        }
        const reaccion = await socialApp.put(
          `/reaccions/${actualizarReaccion.id}`,
          {
            data: {
              usuario: data.id,
              reaccion_tipo: state + 1,
              post,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        return;
      }
      if (state === "") {
        callback();
        return;
      }
      const reaccion = await socialApp.post(
        "/reaccions",
        {
          data: {
            usuario: data.id,
            reaccion_tipo: state + 1,
            post,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setActualizarReaccion({ actualizar: true, id: reaccion?.data?.data?.id });
      callback();
    } catch (error) {
      setActualizarReaccion({ actualizar: false, id: "" });
      setState("");

      console.log(error);
      toastGenerate(
        error.response ? error.response.data.error.message : "Error server"
      );

      console.log(
        error.response ? error.response.data.error.message : "Error server"
      );
    }
  };

  const comprobarReaccion = () => {
    let reaccion = reaccionesPost?.find(
      (e) => e.attributes.usuario.data.id === data.id
    );

    if (reaccion) {
      setState(reaccion?.attributes?.reaccion_tipo?.data?.id - 1);
      setActualizarReaccion({ actualizar: true, id: reaccion?.id });
    }
  };

  return (
    <View style={styles.container}>
      <Reacciones see={true} scale={scaleReacciones} select={state} />

      <Animated.View style={styles.square}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[{ width: widthPercentageToDP(10) }, rStyle]}>
            {renderSelect()}
          </Animated.View>
        </PanGestureHandler>
        {/*   */}

        <FontAwesome
          name="send-o"
          size={heightPercentageToDP(3)}
          color={colores.neutro}
        />
      </Animated.View>

      {console.log(state, "estado seleccionado")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  square: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: widthPercentageToDP(80),
    /*   width: SIZE,
    height: SIZE, */
    /*    backgroundColor: "rgba(0,0,256,0.5)", */
    /*  borderRadius: 20, */
    position: "absolute",
  },

  box: {
    flexDirection: "row",
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(10),
    borderRadius: 25,
    backgroundColor: "#fdfdfd",
    alignItems: "center",
    justifyContent: "space-around",
  },
  containerBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  boxReacciones: {
    alignItems: "center",
    justifyContent: "center",
  },
  textReacciones: {
    fontFamily: "Poppins_700Bold",
    fontSize: tamaño_texto.small,
    color: colores.neutro,
  },
});
