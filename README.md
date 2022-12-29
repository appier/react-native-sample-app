# react-native-sample-app

This is a sample app of integrating [@appier/react-native-sdk](https://www.npmjs.com/package/@appier/react-native-sdk) with [react-native-firebase](https://rnfirebase.io/).
Please read the official [document](https://docs.aiqua.appier.com/docs/versions-for-react-native-integration) before getting start.

## Preparation

1. AIQUA app id
2. iOS appGroup
3. FCM sender id.

## To Run With Your Own FCM and AIQUA Account

To run on your own enviroment and test the funtionality by yourself, you need to follow the steps below.

- Android:
  1. Search and replace all the packag name of `com.rntest` with your own.
  2. Once you change the package name, you should also change the folder name: `app/src/main/java/com/rntest` according to your new package name.
  3. Download the `google-services.json` from your FCM console and put it into `android/app`.

- iOS:
  1. Search and replace all the bundle identifier of `com.appier.rntest` with your own
  2. Search and replace all the `appGroup` of `ios.group.identifier` with your own
  3. Download the `GoogleService-info.plist` from your FCM console and put it into `ios/AppierRNExample`.

- React Native:
  1. Find the code for initialing the SDK in `App.js` at line 116:

    ``` javascript
    RNAiqua.configure({
      appId: '<appId>', // appId from AIQUA dashboard - required
      senderId: '<senderId>', // sender id from your FCM console - required
      appGroup: '<ios.group.identifier>', // your iOS app group - required for iOS
      isDev: true, // ios dev or prod - default `false` - optional
    });
    ```

  2. Change `appId`, **required**
  3. Change `senderId`, **required**
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
- Can get FCM token
- The permission of push notification is granted
