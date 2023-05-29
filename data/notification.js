import {Platform} from 'react-native';

const images = [
  'https://tinyurl.com/ebb58wmb',
  'https://tinyurl.com/2p9abzp5',
  'https://tinyurl.com/bftsjw7k',
  'https://tinyurl.com/yvh445j8',
];

const wording = {
  standard: {
    title: 'We have the standard campaign! 🎉',
    body: 'Congrats! Now you can click to go back to the app.',
  },
  carousel: {
    ios: {
      title: 'We have the carousel campaign! 🎉',
      body: 'Congrats! Long press the message. You can swipe to rotate the images.',
    },
    android: {
      title: 'We have the carousel campaign! 🎉',
      body: 'Congrats! You can click the right and left buttons to rotate the images.',
    },
  },
};

export const getPayload = () => {
  const rno = new Date().getTime();
  return Platform.select({
    ios: {
      legacy: {
        basic: {
          priority: 'high',
          mutable_content: true,
          content_available: true,
          notification: {
            title: wording.standard.title,
            body: wording.standard.body,
            sound: 'default',
            category: '',
          },
          data: {
            nid: 1234,
            qg: 1234567,
            qgPush: {
              type: 'basic',
              url: images[0],
            },
            rno: 1234,
            source: 'QG',
          },
        },
        carousel: {
          priority: 'high',
          mutable_content: true,
          content_available: true,
          notification: {
            title: wording.carousel.ios.title,
            body: wording.carousel.ios.body,
            sound: 'default',
            category: '',
          },
          data: {
            nid: '134064000',
            source: 'QG',
            qgPush: {
              type: 'carousel',
              custom: {
                aspect: 'fill',
                data: [
                  {
                    title: 'Carousel image 1',
                    imageUrl: images[0],
                    // deepLink: 'https://docs.aiqua.appier.com/',
                  },
                  {
                    title: 'Carousel image 2',
                    imageUrl: images[1],
                    // deepLink: 'https://docs.aiqua.appier.com/',
                  },
                  {
                    title: 'Carousel image 3',
                    imageUrl: images[2],
                    // deepLink: 'https://docs.aiqua.appier.com/',
                  },
                  {
                    title: 'Carousel image 4',
                    imageUrl: images[3],
                    // deepLink: 'https://docs.aiqua.appier.com/',
                  },
                ],
                carouselType: 'Linear',
              },
            },
          },
        },
      },
      v1: {
        basic: {
          apns: {
            payload: {
              aps: {
                alert: {
                  title: wording.standard.title,
                  body: wording.standard.body,
                },
                sound: 'default',
                category: '',
                'mutable-content': 1,
              },
              nid: 1234,
              qg: 1234567,
              qgPush: {
                type: 'basic',
                url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
              },
              rno: 1234,
              source: 'QG',
            },
          },
        },
        carousel: {
          apns: {
            payload: {
              rno: 837,
              deepLink: 'https://docs.aiqua.appier.com/',
              qg: 13406,
              aps: {
                alert: {
                  title: wording.carousel.ios.title,
                  body: wording.carousel.ios.body,
                },
                'mutable-content': 1,
                sound: 'default',
              },
              nid: '134064000',
              source: 'QG',
              qgPush: {
                type: 'carousel',
                custom: {
                  aspect: 'fill',
                  data: [
                    {
                      title: 'Carousel image 1',
                      imageUrl: 'https://picsum.photos/id/10/200/300.jpg',
                      deepLink: 'https://docs.aiqua.appier.com/',
                    },
                    {
                      title: 'Carousel image 2',
                      imageUrl: 'https://picsum.photos/id/20/200/300.jpg',
                      deepLink: 'https://docs.aiqua.appier.com/',
                    },
                    {
                      title: 'Carousel image 3',
                      imageUrl: 'https://picsum.photos/id/30/200/300.jpg',
                      deepLink: 'https://docs.aiqua.appier.com/',
                    },
                    {
                      title: 'Carousel image 4',
                      imageUrl: 'https://picsum.photos/id/40/200/300.jpg',
                      deepLink: 'https://docs.aiqua.appier.com/',
                    },
                  ],
                  carouselType: 'Linear',
                },
              },
            },
          },
        },
      },
    },
    android: {
      legacy: {
        basic: {
          priority: 'high',
          data: {
            message: `{
            "bigImageUrl": "${images[0]}",
            "headsUp": true,
            "source": "QG",
            "title": "${wording.standard.title}",
            "message": "${wording.standard.body}",
            "type": "basic",
            "subText": "A cattle herding dog breed",
            "resize_image": false,
            "rno": ${rno},
            "pileUp": true,
            "imageUrl": "${images[2]}",
            "qgPayload": {
              "myKey": "myValue"
            },
            "notificationId": ${rno},
            "channelId": "po"
          }`,
          },
        },
        carousel: {
          priority: 'high',
          data: {
            message: `{"carousel":[{"image":"${images[1]}","message":"Carousel image 1","title":"Image 1"},{"image":"${images[2]}","message":"Carousel image 2","title":"Image 2"},{"image":"${images[3]}","message":"Carousel image 3","title":"Image 3"}],"channelId":"po","closeNotificationOnItemClick":true,"headsUp":true,"message":"A basic carousel creative.","notificationId":${rno},"qg_next_button":"https://cdn.qgraph.io/img/right.png","qg_prev_button":"https://cdn.qgraph.io/img/left.png","resize_image":false,"rno":${rno},"source":"QG","title":"${wording.carousel.android.title}","message":"${wording.carousel.android.body}","type":"carousel"}`,
          },
        },
      },
      v1: {
        basic: `{
            "bigImageUrl": "https://picsum.photos/id/1/200/300.jpg",
            "headsUp": true,
            "source": "QG",
            "poll": true,
            "title": "${wording.standard.title}",
            "message": "${wording.standard.body}",
            "type": "basic",
            "subText": "A cattle herding dog breed",
            "resize_image": false,
            "rno": ${rno},
            "pileUp": true,
            "deepLink": "https://www.google.com/",
            "imageUrl": "https://picsum.photos/id/2/200/300.jpg",
            "qgPayload": {
              "myKey": "myValue"
            },
            "notificationId": ${rno},
            "channelId": "po"
          }`,
        carousel: `{"carousel":[{"image":"https://picsum.photos/id/1/512/512","message":"Carousel image 1","title":"Image 1"},{"image":"https://picsum.photos/id/2/512/512","message":"Carousel image 2","title":"Image 2"},{"image":"https://picsum.photos/id/3/512/512","message":"Carousel image 3","title":"Image 3"}],"channelId":"po","closeNotificationOnItemClick":true,"headsUp":true,"message":"A basic carousel creative.","notificationId":${rno},"qg_next_button":"https://cdn.qgraph.io/img/right.png","qg_prev_button":"https://cdn.qgraph.io/img/left.png","resize_image":false,"rno":${rno},"source":"QG","title":"${wording.carousel.android.title}","message":"${wording.carousel.android.body}","type":"carousel"}`,
      },
    },
  });
};

export default {getPayload};
