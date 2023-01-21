import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import AnimatedLottieView from "lottie-react-native";
import GlowingSun from "./Reacciones";
import BotonComponent from "../components/BotonComponent";
import { toastGenerate } from "../utils/ToastGenerate";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
export default function MapaPost({ navigation }) {
  const [origin, setOrigin] = useState({
    latitude: 4.139825,
    longitude: -73.622545,
  });

  const marker = useRef();
  const [location, setLocation] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState();
  useEffect(() => {
    obtenerUbicacion();
  }, []);
  const obtenerUbicacion = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      toastGenerate("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setOrigin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setLocation(location);
  };

  const tomarFoto = async () => {
    if (!status.granted) {
      requestPermission();
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      /* setImage(image.assets[0].uri); */
      navigation.navigate("Post", { image: result.assets, location: origin });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={marker}
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        {console.log(location)}
        <Marker
          ref={marker}
          draggable
          coordinate={origin}
          onDragEnd={(e) => {
            setOrigin(e.nativeEvent.coordinate);
          }}
        >
          <AnimatedLottieView
            autoPlay
            style={{
              width: heightPercentageToDP(20),
              height: heightPercentageToDP(20),
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("../../assets/radar.json")}
          />
        </Marker>
      </MapView>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          bottom: heightPercentageToDP(35),
        }}
        onPress={() => obtenerUbicacion()}
      >
        <Text>Actualizar</Text>
      </TouchableOpacity>
      <BotonComponent
        label="Confirmar"
        width={50}
        type="primary"
        style={{
          position: "absolute",
          bottom: heightPercentageToDP(15),
          left: widthPercentageToDP(25),
          right: heightPercentageToDP(25),
        }}
        funcion={() => {
          tomarFoto();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: { width: widthPercentageToDP(100), height: heightPercentageToDP(100) },
});
