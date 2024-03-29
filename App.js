import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RNAiqua from '@appier/react-native-sdk';
import messaging from '@react-native-firebase/messaging';
import {
  RESULTS,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import {sendMessage} from './src/fcmHttpApi';
import {appier as AppSettings} from './app.json';

const Section = props => {
  return (
    <View>
      <Text
        style={{
          backgroundColor: '#eee',
          padding: 6,
          color: '#222222',
          fontWeight: '900',
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
      <Text style={{fontSize: 15, fontWeight: 'bold', color: '#222222'}}>
        {title}
      </Text>
      {content != null ? (
        <Text selectable={true} style={{color: '#555555', fontSize: 13}}>
          {content}
        </Text>
      ) : null}
    </View>
  );
};

const App = () => {
  const [fcmToken, setFcmToken] = useState(null);
  const [isSending, setIsSending] = useState(false);
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
      const fcmMessageToken = await messaging().getToken();
      console.log('FCM token:', fcmMessageToken);
      if (fcmMessageToken != null) {
        setFcmToken(fcmMessageToken);

        const {appId, ios, fcm} = AppSettings;
        RNAiqua.configure({
          appId: appId, // appId from AIQUA dashboard
          senderId: fcm.senderId, // sender id from your FCM console
          appGroup: ios.appGroup, // your iOS app group
          isDev: ios.isDev, // ios dev or prod - default `true` - optional
        });

        // On iOS, you need the pass FCM token to AIQUA
        if (Platform.OS === 'ios') {
          RNAiqua.setFCMToken(fcmMessageToken);
        }
      }
    } catch (ex) {
      console.error(ex?.message || JSON.stringify(ex));
    }
  }

  const sendCarousel = () => {
    sendTestingNotification('carousel');
  };

  const sendBasic = () => {
    sendTestingNotification('basic');
  };

  const sendTestingNotification = async messageType => {
    setIsSending(true);
    await sendMessage({fcmToken, messageType}).then(resp => {
      if (resp?.failure) {
        const error = resp.results[0]?.error;
        if (error === 'MismatchSenderId') {
          Alert.alert(
            'Error',
            `It seems that the 'serverKey' and '${Platform.select({
              ios: 'GoogleService-info.plist',
              android: 'google-service.json',
            })}' you have provided come from different FCM projects.\n\nPlease double-check the information you have provided.`,
          );
        }
      }
      if (resp?.name === 'SyntaxError') {
        Alert.alert(
          'Error',
          "It seems that the 'serverKey' you have provided is in the wrong format. \n\nPlease double-check the information you have provided.",
        );
      }
    });
    setIsSending(false);
  };

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

          <Section title={'Push Campaign'}>
            <Item title={'Your FCM Token:'} content={fcmToken} />
            <Item
              title={'Status of Notification Permission:'}
              content={notificationPermissionStatus}
            />
            <Item title={'Send a Test Notification:'} />
            <TouchableOpacity
              disabled={isSending}
              onPress={() => {
                sendBasic();
              }}
              style={{
                height: 50,
                marginHorizontal: 20,
                marginVertical: 4,
                borderRadius: 4,
                backgroundColor: '#eeeeee',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center', color: '#222222'}}>
                {isSending ? 'sending...' : 'Send (Basic)'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isSending}
              onPress={() => {
                sendCarousel();
              }}
              style={{
                height: 50,
                marginHorizontal: 20,
                marginVertical: 4,
                borderRadius: 4,
                backgroundColor: '#eee',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center', color: '#222222'}}>
                {isSending ? 'sending...' : 'Send (Heads up, Carousel)'}
              </Text>
            </TouchableOpacity>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
