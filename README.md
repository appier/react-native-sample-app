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
  1. Register a new Android App with the package name `com.rntest` in your FCM project.
  2. Download the `google-services.json` from your FCM console and put it into `android/app`.

- iOS:
  1. Search and replace all the bundle identifier of `com.appier.rntest` with your own
  2. Search and replace all the `appGroup` of `ios.group.identifier` with your own
  3. Download the `GoogleService-info.plist` from your FCM console and put it into `ios/AppierRNExample`.

- React Native:
  1. Find the code for initialing the SDK in `App.js` at line 123:

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

This sample app support both FCM **legacy** and **V1** HTTP API to send test notifications. Provide your FCM information in the `fcmApi.json` file. There are some required items depending on the API.

Please fill in the necessary information in the `fcmApi.json` file as indicated below.

**For FCM Legacy HTTP API**:

```json
{
    "api_type": "legacy",
    "legacy_server_key": "<FCM Cloud Messaging Server key>"
}
```

- **legacy_server_key**: You can find your `Server key` in the FCM console -> Project settings -> Cloud Messaging Tab.

**For FCM V1 HTTP API**:

```json
{
    "api_type": "v1",
    "fcm_project_id": "<your fcm project id>",
    "token": "<OAuth 2.0 access token>"
    
}
```

- **fcm_project_id**: You can find your  FCM `Project ID` in the FCM console -> Project settings -> General tab.
- **token**: HTTP v1 require an OAuth 2.0 access token to send requests. You can follow this [instruction](https://firebase.google.com/docs/cloud-messaging/migrate-v1) to get your token.

## Push Campaign Troubleshooting

Check the following items if you can't receive push notifications:

- The device is connected to the network
- Segment is correctly set on AIQUA dashboard
- Can get FCM token
- The permission of push notification is granted
