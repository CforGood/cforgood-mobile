import { Platform } from "react-native";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export const checkLocationAndroid = () => {
  if (Platform.OS === "android") {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "Activé le GPS",
      ok: "Oui",
      cancel: "NON",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, // true => To prevent the location services popup from closing when it is clicked outside
      preventBackClick: true, // true => To prevent the location services popup from closing when it is clicked back button
      providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    })
      .then(success => {})
      .catch(error => {});
  }
};
