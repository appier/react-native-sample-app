# react-native-sample-app

This is a react-native sample app that demonstrates integrating of the [@appier/react-native-sdk](https://www.npmjs.com/package/@appier/react-native-sdk) with the build-in FCM on Android and APNs on iOS.
Before starting, please read the official [document](https://docs.aiqua.appier.com/docs/versions-for-react-native-integration).

Please noted that this is the `native` branch, and there is no need for `react-native-firebase`.

## Preparation

1. AIQUA app id.
2. iOS appGroup id.
3. Your FCM sender id for Android.

## To Run With Your Own FCM and AIQUA Account

To test the functionality on your own environment, follow the steps below.

- Android:
  1. Register a new Android App with the package name `com.rntest` in your FCM project.
  2. Download the `google-services.json` from your FCM console and put it into `android/app`.

- iOS:
  1. Search and replace all the bundle identifier of `com.appier.rntest` with your own
  2. Search and replace all the `appGroup` of `ios.group.identifier` with your own.

- React Native:
  1. Find the code for initialing the SDK in `App.js` at line 74:

    ``` javascript
    RNAiqua.configure({
      appId: '<appId>', // appId from AIQUA dashboard - required
      senderId: '<senderId>', // sender id from your FCM console
      appGroup: '<ios.group.identifier>', // your iOS app group
      isDev: true, // ios dev or prod - default `false` - optional
    });
    ```

  2. Change `appId`, **required**
  3. Change `senderId`, **required only for Android**
  4. Change `appGroup`, **required only for iOS**
  5. `isDev`, optional.

## Install And Run

- Android:

  ```shell
  yarn && npx react-native run-android
  ```

- iOS:

  ```shell
  yarn && cd ios && pod install
  cd .. && npx react-native run-ios
  ```
  
## Push Campaign Troubleshooting

Check the following items if you can't receive push notifications:

- The device is connected to the network
- Segment is correctly set on AIQUA dashboard
- For Android, make sure you can see the FCM token in the logs.
- For iOS, make sure you can see the device token in the logs.
- The permission of push notification is granted
