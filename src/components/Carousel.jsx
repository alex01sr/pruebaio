import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { colores, tamaño_texto } from "../utils/material";
import { Video, AVPlaybackStatus } from "expo-av";
import { URL_API } from "@env";
import renderItemCarousel from "./RenderItemCarousel";
import RenderItemCarousel from "./RenderItemCarousel";

const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

export default function Carousel({
  data = [],
  width = 90,
  height = 30,
  origin = "local",
  see,
  reaccionesPost,
}) {
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewRef = useRef(({ changed }) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index: index });
  };

  return (
    <View style={styles.boxCarousel}>
      <FlatList
        style={[
          styles.carousel,
          {
            width: widthPercentageToDP(width),
            maxWidth: widthPercentageToDP(width),
            maxHeight: heightPercentageToDP(height),
          },
        ]}
        data={data}
        renderItem={(item, index) => {
          return (
            <RenderItemCarousel
              item={item}
              origin={origin}
              width={width}
              height={height}
              currentIndex={currentIndex}
              see={see}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={(ref) => (flatListRef.current = ref)}
        viewabilityConfig={viewConfigRef}
        onViewableItemsChanged={onViewRef.current}
      />
      <View style={styles.dotView}>
        {data?.map(({}, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              style={
                [
                  styles.circle,
                  {
                    backgroundColor:
                      index == currentIndex ? colores.primary : "grey",
                  },
                ]
                /*  */
              }
              onPress={() => scrollToIndex(index)}
            ></TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.boxReacciones}>
        <Text style={styles.textReacciones}>Reacciones</Text>
        <Text style={styles.textReacciones}>
          {reaccionesPost.length > 0 ? reaccionesPost.length : 0}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    borderRadius: 20,
    maxHeight: heightPercentageToDP(30),
    maxWidth: widthPercentageToDP(90),
  },
  boxCarousel: {
    width: widthPercentageToDP(90),
    alignItems: "center",
    justifyContent: "center",
  },

  dotView: {
    height: heightPercentageToDP(1),
    width: widthPercentageToDP(80),
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: heightPercentageToDP(0.5),
  },
  circle: {
    width: widthPercentageToDP(2),
    height: widthPercentageToDP(2),
    backgroundColor: "black",
    borderRadius: 50,
    marginHorizontal: widthPercentageToDP(0.5),
  },
  boxReacciones: {
    position: "absolute",
    bottom: heightPercentageToDP(-4),
    alignItems: "center",
    justifyContent: "center",
  },
  textReacciones: {
    fontFamily: "Poppins_700Bold",
    fontSize: tamaño_texto.small,
    color: colores.neutro,
  },
});
