import { ToastAndroid, Platform } from "react-native";
import Toast from "react-native-root-toast";
export function toastGenerate(string) {
  if (Platform.OS !== "ios") {
    ToastAndroid.showWithGravityAndOffset(
      string,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      5,
      5
    );
  } else {
    Toast.show(string, {
      duration: 4000,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }
}
