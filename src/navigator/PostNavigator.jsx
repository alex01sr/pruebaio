import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as React from "react";
import ActualizaComunidad from "../screens/ActualizaComunidad";

import MapaPost from "../screens/MapaPost";
import Post from "../screens/Post";

const Stack = createNativeStackNavigator();

export default function PostNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MapaPost"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="MapaPost" component={MapaPost} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="ActualizaComunidad" component={ActualizaComunidad} />
    </Stack.Navigator>
  );
}
