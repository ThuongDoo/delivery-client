import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
// import { PERMISSIONS, check, RESULTS } from "react-native-permissions";

const Permission = () => {
  const [locationPermission, setLocationPermission] = useState(false);
  // check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
  //   .then((result) => {
  //     switch (result) {
  //       case RESULTS.UNAVAILABLE:
  //         console.log(
  //           "This feature is not available (on this device / in this context)"
  //         );
  //         break;
  //       case RESULTS.DENIED:
  //         console.log(
  //           "The permission has not been requested / is denied but requestable"
  //         );
  //         break;
  //       case RESULTS.LIMITED:
  //         console.log("The permission is limited: some actions are possible");
  //         break;
  //       case RESULTS.GRANTED:
  //         console.log("The permission is granted");
  //         break;
  //       case RESULTS.BLOCKED:
  //         console.log("The permission is denied and not requestable anymore");
  //         break;
  //     }
  //   })
  //   .catch((error) => {
  //     // …
  //   });
  return (
    <View>
      <Button title="Request Camera Permission" />
    </View>
  );
};

export default Permission;
