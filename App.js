import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import RNAiqua from '@appier/react-native-sdk';
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
      {props.children}
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
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState(null);

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
    RNAiqua.configure({
      appId: '<appId>', // appId from AIQUA dashboard
      senderId: '<senderId>', // sender id from your FCM console
      appGroup: '<ios.group.identifier>', // your iOS app group
      isDev: true, // ios dev or prod - default `false` - optional
    });
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
