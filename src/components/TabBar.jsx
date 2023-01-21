import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../utils/material";
import LottieView from "lottie-react-native";
import { useRef } from "react";
export default function TabBar({ state, descriptors, navigation }) {
  const animation = useRef(null);
  return (
    <>
      <View style={[styles.boxBlur, styles.box]}>
        <View style={styles.boxText}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({ name: route.name, merge: true });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            let iconName = "";
            let iconNameFocu = "";
            switch (route.name) {
              case "Home":
                iconName = "home-outline";
                iconNameFocu = "home";
                break;
              case "Buscar":
                iconName = "search-outline";
                iconNameFocu = "search";
                break;
              case "Post":
                iconName = "add-outline";
                iconNameFocu = "add";
                break;
              case "MeGusta":
                iconName = "heart-outline";
                iconNameFocu = "heart";
                break;
              case "PerfilNav":
                iconName = "person-outline";
                iconNameFocu = "person";
                break;
            }
            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <View style={styles.boxIconFocu}>
                  {route.name === "PostNav" ? (
                    <View style={styles.boxFocu}>
                      <LottieView
                        autoPlay
                        ref={animation}
                        style={{
                          width: heightPercentageToDP(5),
                          height: heightPercentageToDP(5),
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={require("../../assets/eyes.json")}
                      />
                    </View>
                  ) : (
                    <Ionicons
                      name={isFocused ? iconNameFocu : iconName}
                      size={heightPercentageToDP(3.5)}
                      color={colores.secondary}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  boxBlur: {
    position: "absolute",

    height: heightPercentageToDP(9),
    width: widthPercentageToDP(100),
    right: widthPercentageToDP(0),
    left: widthPercentageToDP(0),
    bottom: heightPercentageToDP(0),
  },
  box: {
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  boxFocu: {
    height: heightPercentageToDP(8),
    width: heightPercentageToDP(8),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colores.secondary,
    position: "absolute",
    top: heightPercentageToDP(-7),
    borderRadius: 100,
  },
  boxIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  boxIconFocu: {
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    flexDirection: "row",
    width: widthPercentageToDP(100),
    justifyContent: "space-around",
  },
});
