import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { colores } from "../utils/material";
import { useDispatch } from "react-redux";
import socialApp from "../api/socialApp";
import { setDataUser, setJwt } from "../../redux/actions";
import { toastGenerate } from "../utils/ToastGenerate";
import dataResponse from "../utils/dataResponse";
import * as SecureStore from "expo-secure-store";

export default function Loading({ navigation }) {
  const dispatch = useDispatch();

  const verificarData = async () => {
    try {
      /*       let seeTutorial = await SecureStore.getItemAsync("tutorial_see"); */
      /*   if (true) {
        navigation.replace("Slider");
        return;
      } */

      let responseJwt = await SecureStore.getItemAsync("jwt");

      if (responseJwt) {
        let response = await socialApp.get(`/users/me`, {
          headers: {
            Authorization: `Bearer ${responseJwt}`,
          },
        });

        dispatch(setJwt(responseJwt));

        dispatch(setDataUser(response.data));
        navigation.replace("Slider");
      } else {
        navigation.replace("Login");
      }
    } catch (error) {
      await SecureStore.deleteItemAsync("jwt");

      dispatch(setJwt(""));
      dispatch(setDataUser({}));
      navigation.replace("Loading");
      toastGenerate(
        error.response ? error.response.data.error.message : "Error server"
      );
      console.log(error);
      console.log(
        error.response ? error.response.data.error.message : "Error server"
      );
    }
  };

  useEffect(() => {
    dataResponse(dispatch);
    setTimeout(verificarData, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colores.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
