# react-native-sample-app

This is a sample app of integrating [@appier/react-native-sdk](https://www.npmjs.com/package/@appier/react-native-sdk) with [react-native-firebase](https://rnfirebase.io/).
Please read the official [document](https://docs.aiqua.appier.com/docs/versions-for-react-native-integration) before getting start.

## Preparation

1. Obtain the AIQUA app ID from the AIQUA dashboard. This will be used as `appId` in the following instructions.
2. A Firebase project.
3. Obtain the iOS app group ID. Check [here](https://docs.aiqua.appier.com/docs/rich-push-notifications#1-save-your-app-group-id) to learn more. This will be used as `appGroup` in the following instructions.

## To Run With Your Own FCM and AIQUA Account

To run on your own enviroment and test the funtionality by yourself, you need to follow the steps below.

- Android:
  1. Register a new Android App with the package name `com.rntest` in your FCM project.
  2. Download the `google-services.json` from your FCM console and put it into `android/app`.

- iOS:
  1. Search and replace all the bundle identifier of `com.appier.rntest` with your own.
  2. Search and replace all the `appGroup` of `ios.group.identifier` with your own.
  3. Download the `GoogleService-info.plist` from your FCM console and put it into `ios/AppierRNExample`.

- React Native:
  1. Provide your information in `app.json` as indicated below. All fields need to be required for working on both Android and iOS.
  
    ``` json
    {
      "name": "AppierRNExample",
      "displayName": "AppierRNExample",
      "appier": {
        "appId": "<appId>",
        "ios": {
          "appGroup": "<ios.group.identifier>",
          "isDev": true
          },
        "fcm": {
          "senderId": "<FCM senderId>",
          "serverKey": "<Cloud Messaging API (Legacy) server key>"
        }    
      }
    }
    ```

  2. Change `<appId>`, `<ios.group.identifier>`, `<FCM senderId>` and `<Cloud Messaging API (Legacy) server key>` to your own.
  3. You can find both your `FCM senderId` and `Cloud Messaging API (Legacy) server key` in the FCM console -> Project settings -> Cloud Messaging Tab.

## Install and Run

- Android:

  ```shell
  yarn && npx react-native run-android
  ```

- iOS:

  ```shell
  yarn && cd ios && pod install
  cd .. && npx react-native run-ios
  ```
  
## Send a Test Notification

This sample app support FCM **legacy** HTTP API to send test notifications. To enable push notifications, please fill out the `fcm` object in the JSON file `app.json` with the appropriate values for your Firebase Cloud Messaging configuration as described above.

## Push Campaign Troubleshooting

Check the following if you are unable to receive push notifications:

- The device is connected to the network.
- You can obtain an FCM token.
- GoogleService-info.plist (for iOS) or google-services.json (for Android) is located in the correct path.
- Push notification permission has been granted.
