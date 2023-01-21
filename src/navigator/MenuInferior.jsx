import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../components/TabBar";
import Home from "../screens/Home";
import MapaPost from "../screens/MapaPost";
import MeGusta from "../screens/MeGusta";

import Perfil from "../screens/Perfil";
import Post from "../screens/Post";
import Search from "../screens/Search";
import PerfilNavigator from "./PerfilNavigator";
import PostNavigator from "./PostNavigator";
const Tab = createBottomTabNavigator();

export default function MenuInferior() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      sceneContainerStyle={{ backgroundColor: "#FAFAFA" }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Buscar" component={Search} />
      <Tab.Screen name="PostNav" component={PostNavigator} />
      <Tab.Screen name="MeGusta" component={MeGusta} />
      <Tab.Screen name="PerfilNav" component={PerfilNavigator} />
    </Tab.Navigator>
  );
}
