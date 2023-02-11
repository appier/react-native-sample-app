import {Platform} from 'react-native';
import {
  token,
  fcm_project_id,
  legacy_server_key,
  api_type,
} from '../fcmApi.json';
import notification from '../data/notification';

const V1_API_URL = `https://fcm.googleapis.com/v1/projects/${fcm_project_id}/messages:send`;
const LEGACY_API_URL = 'https://fcm.googleapis.com/fcm/send';

export const sendMessage = ({fcmToken, messageType}) => {
  const messagePayload = notification.getPayload()[api_type][messageType];
  if (api_type === 'legacy') {
    return sendMessageLegacy(fcmToken, messagePayload);
  } else if (api_type === 'v1') {
    return sendMessageV1(fcmToken, messagePayload);
  } else {
    console.error('Error: `api_type` Mismatch!');
  }
};

const sendMessageLegacy = (fcmToken, messagePayload) => {
  console.log('Send message by FCM Legacy HTTP API...');
  const auth = `key=${legacy_server_key}`;
  const body = {
    to: fcmToken,
    ...messagePayload,
  };
  return makePostRequest(LEGACY_API_URL, auth, body);
};
const sendMessageV1 = (fcmToken, messagePayload) => {
  console.log('Send message by FCM V1 HTTP API...');
  const auth = `Bearer ${token}`;
  const body = Platform.select({
    ios: {
      message: {
        token: fcmToken,
        ...messagePayload,
      },
    },
    android: {
      message: {
        token: fcmToken,
        android: {
          priority: 'high',
          data: {
            message: messagePayload,
          },
        },
      },
    },
  });
  return makePostRequest(V1_API_URL, auth, body);
};

const makePostRequest = (url, auth, body) => {
  return new Promise(resolve => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then(resp => resp.json())
      .then(data => {
        if (data?.error) {
          if (data?.error.message) {
            console.error('Failed to send the message:', data);
          }
        } else {
          console.log('Message sent successfully:', data);
        }
        resolve(data);
      })
      .catch(error => {
        console.error('Exception catched:', error);
        resolve(error);
      });
  });
};
