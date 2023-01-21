import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as React from "react";

import Perfil from "../screens/Perfil";

import ActualizaComunidad from "../screens/ActualizaComunidad";

const Stack = createNativeStackNavigator();

export default function PerfilNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Perfil"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#FAFAFA" },
      }}
    >
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="ActualizaComunidad" component={ActualizaComunidad} />
    </Stack.Navigator>
  );
}
