import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import RNAiqua from '@appier/react-native-sdk';
import messaging from '@react-native-firebase/messaging';
import {
  RESULTS,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

const Section = props => {
  return (
    <View>
      <Text
        style={{
          backgroundColor: '#eee',
          padding: 6,
          fontWeight: 'bold',
          fontSize: 17,
        }}>
        {props.title}
      </Text>

      {props.children?.map(item => {
        return item;
      })}
    </View>
  );
};

const Item = ({title, content}) => {
  return (
    <View style={{padding: 6}}>
      <Text style={{fontWeight: 'bold'}}>{title}</Text>
      <TextInput scrollEnabled={false} multiline={true} editable={false}>
        {content}
      </TextInput>
    </View>
  );
};

const App = () => {
  const [fcmToken, setFcmToken] = useState(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState(null);
  useEffect(() => {
    // On Android, to receive notifications while App is in foreground, we need to
    // implement `onMessage` and handle the message by AIQUA
    if (Platform.OS === 'android') {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
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
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    askPushNotification();
    initializeSDK();
  }, []);

  const askPushNotification = async () => {
    try {
      await checkNotifications().then(({status, settings}) => {
        setNotificationPermissionStatus(status);
        if (status === RESULTS.DENIED) {
          requestNotifications(['alert', 'sound', 'badge']).then(
            requestResult => {
              setNotificationPermissionStatus(requestResult.status);
              console.log(
                `result of requesting Notification permission: ${requestResult.status}`,
              );
            },
          );
        }
      });
    } catch (ex) {
      console.error(ex?.message || JSON.stringify(ex));
    }
  };

  async function initializeSDK() {
    const isRegisteredForRemoteMessage =
      messaging().isDeviceRegisteredForRemoteMessages;
    console.log('isRegisteredForRemoteMessage:', isRegisteredForRemoteMessage);

    try {
      if (!isRegisteredForRemoteMessage) {
        await messaging()
          .registerDeviceForRemoteMessages()
          .then(result => console.log('result:', result))
          .catch(error => console.log('error:', error));
      }
      const token = await messaging().getToken();
      console.log('FCM token:', token);
      if (token != null) {
        setFcmToken(token);
        RNAiqua.configure({
          appId: '<appId>', // appId from AIQUA dashboard
          senderId: '<senderId>', // sender id from your FCM console
          appGroup: '<ios.group.identifier>', // your iOS app group
          isDev: true, // ios dev or prod - default `false` - optional
        });

        // On iOS, you need the pass FCM token to AIQUA
        if (Platform.OS === 'ios') {
          RNAiqua.setFCMToken(token);
        }
      }
    } catch (ex) {
      console.error(ex?.message || JSON.stringify(ex));
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <ScrollView>
        <View style={{flex: 1}}>
          <Text
            style={{
              marginTop: 56,
              color: '#222',
              fontWeight: 'bold',
              fontSize: 30,
              paddingHorizontal: 40,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Welcome to Appier React Native Sample App!
          </Text>

          <Section title={`Push Campaign`}>
            <Item title={`Your FCM Token:`} content={fcmToken} />
            <Item
              title={`Status of Notification Permission:`}
              content={notificationPermissionStatus}
            />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
