import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { colores, tamaño_texto } from "../utils/material";
import Carousel from "./Carousel";
import Reacciones from "../screens/Reacciones";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Handler from "./Handler";
import { URL_API } from "@env";
export default function CardPostFeed({ post, indexPost, index, callback }) {
  const {
    anonimo,
    autor,
    comunidad,
    descripcion,
    media,
    publishedAt,
    reacciones,
    id,
  } = post.attributes;

  const { nombre_marca, avatar } = autor.data.attributes;
  const { url } = avatar.data.attributes.formats.small;

  const { titulo: tituloComunidad } = comunidad.data.attributes;
  const date = new Date(publishedAt).toLocaleDateString("es-es", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const { data = [] } = media;

  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const popupPosition = useSharedValue({ x: 0, y: 0 });
  const popupAlpha = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
      ],
    };
  });

  const animatedPopupStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: popupPosition.value.x },
        { translateY: popupPosition.value.y },
      ],
      opacity: popupAlpha.value,
    };
  });

  const dragGesture = Gesture.Pan()
    .onStart((_e) => {
      popupAlpha.value = withTiming(0);
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const longPressGesture = Gesture.LongPress().onStart((_event) => {
    popupPosition.value = { x: offset.value.x, y: offset.value.y };
    popupAlpha.value = withTiming(1);
  });

  return (
    <View style={styles.container}>
      <View style={styles.perfil}>
        <View style={styles.boxPerfil}>
          <Image
            style={styles.fotoPerfil}
            source={{ uri: `${URL_API}${url}` }}
          />
          <View style={styles.bordePerfil} />
        </View>

        <View style={styles.boxNombre}>
          <Text style={styles.titleNombre}>{nombre_marca}</Text>
          <Text style={[styles.titleNombre, { color: "#A3A3A3" }]}>{date}</Text>
        </View>
      </View>
      <View style={styles.boxCarousel}>
        <Carousel
          data={data}
          width={80}
          height={60}
          origin="remote"
          see={indexPost === index}
          reaccionesPost={reacciones.data}
        />
        <Handler
          post={post.id}
          reaccionesPost={reacciones.data}
          callback={callback}
        />
        <Text style={styles.description}>
          {nombre_marca}: <Text>{descripcion}</Text>
        </Text>
        {/*  <Reacciones see={indexPost === index} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: heightPercentageToDP(1.5),
    width: widthPercentageToDP(90),
    /*    height: heightPercentageToDP(90), */
    marginVertical: heightPercentageToDP(1),
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  perfil: {
    width: widthPercentageToDP(90),
    flexDirection: "row",
    alignItems: "center",
  },
  fotoPerfil: {
    width: widthPercentageToDP(13),
    height: widthPercentageToDP(13),
    resizeMode: "cover",
    backgroundColor: "#D8D8D8",
    borderRadius: 50,
  },
  boxPerfil: {
    alignItems: "center",
    justifyContent: "center",
  },
  bordePerfil: {
    position: "absolute",
    width: widthPercentageToDP(16),
    height: widthPercentageToDP(16),
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colores.primary,
  },
  boxNombre: {
    marginLeft: widthPercentageToDP(5),
  },

  titleNombre: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: tamaño_texto.small,
    color: "#3A3D3F",
  },
  description: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: tamaño_texto.small,
    color: "#3A3D3F",
    alignSelf: "flex-start",
  },
  boxCarousel: {
    marginTop: heightPercentageToDP(5),
    alignItems: "center",
  },
});
