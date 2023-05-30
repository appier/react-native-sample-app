/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import RNAiqua from '@appier/react-native-sdk';

// On Android, to receive notifications while App is in background or quit, we need to
// set a handler and handle the message by AIQUA
if (Platform.OS === 'android') {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // When receiving a remote message, check if it's from AIQUA first.
    if (
      remoteMessage.from &&
      remoteMessage.data &&
      remoteMessage.data.message
    ) {
      const json = JSON.parse(remoteMessage.data.message);
      if (json.source === 'QG') {
        // If the message is from AIQUA, send it to Appier SDK by calling this API.
        RNAiqua.handleRemoteMessage(remoteMessage.data.message);
      }
    }
  });

  messaging().onNotificationOpenedApp(qgPayload => {
    console.log('Notification Open App:', qgPayload);
  });
}

AppRegistry.registerComponent(appName, () => App);
