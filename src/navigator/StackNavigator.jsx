import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as React from "react";
import ConfirmarCorreo from "../screens/ConfirmarCorreo";
import Example from "../screens/Reacciones";
import Login from "../screens/Login";
import MapaPost from "../screens/MapaPost";
import RecuperarContrasena from "../screens/RecuperarContrasena";
import SeleccionaComunidad from "../screens/SeleccionaComunidad";
import MenuInferior from "./MenuInferior";
import Handler from "../components/Handler";
import Slider from "../screens/Slider";
import Loading from "../screens/Loading";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="Slider" component={Slider} />
      <Stack.Screen name="Loading" component={Loading} />

      <Stack.Screen name="Handler" component={Handler} />

      <Stack.Screen name="MapaPost" component={MapaPost} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="RecuperarContrasena"
        component={RecuperarContrasena}
      />

      <Stack.Screen name="ConfirmarCorreo" component={ConfirmarCorreo} />
      <Stack.Screen
        name="SeleccionaComunidad"
        component={SeleccionaComunidad}
      />
      <Stack.Screen name="MenuInferior" component={MenuInferior} />
    </Stack.Navigator>
  );
}
