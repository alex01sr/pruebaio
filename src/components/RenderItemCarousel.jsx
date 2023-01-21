import { StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import { URL_API } from "@env";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";

export default function RenderItemCarousel({
  item,
  origin = "local",
  width,
  height,
  currentIndex,
  see = true,
}) {
  const renderItemCarousel = () => {
    switch (origin) {
      case "local": {
        const { uri, type } = item.item;

        return (
          <>
            {type === "video" ? (
              <Video
                shouldPlay={item.index === currentIndex && see}
                style={{
                  width: widthPercentageToDP(width),
                  height: heightPercentageToDP(height),
                  resizeMode: "contain",
                  backgroundColor: "#000",
                  borderRadius: 20,
                }}
                source={{
                  uri,
                }}
                resizeMode="contain"
                isLooping
              />
            ) : (
              <Image
                source={{ uri }}
                style={{
                  backgroundColor: "#000",
                  width: widthPercentageToDP(width),
                  height: heightPercentageToDP(height),
                  resizeMode: "contain",
                  borderRadius: 20,
                }}
              />
            )}
          </>
        );
      }

      case "remote": {
        const { url, mime } = item.item.attributes;
        return (
          <>
            {mime.includes("video") ? (
              <Video
                shouldPlay={item.index === currentIndex && see}
                style={{
                  width: widthPercentageToDP(width),
                  height: heightPercentageToDP(height),
                  resizeMode: "center",
                  backgroundColor: "#000",
                  borderRadius: 20,
                }}
                source={{
                  uri: `${URL_API}${url}`,
                }}
                useNativeControls={false}
                resizeMode="contain"
                isLooping
              />
            ) : (
              <Image
                source={{ uri: `${URL_API}${url}` }}
                style={{
                  backgroundColor: "#000",
                  width: widthPercentageToDP(width),
                  height: heightPercentageToDP(height),
                  resizeMode: "contain",
                  borderRadius: 20,
                }}
              />
            )}
          </>
        );
      }

      default:
        break;
    }
  };

  return renderItemCarousel();
}
