#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

#import <Appier/Appier.h>
#import <UserNotifications/UserNotifications.h>

@interface AppDelegate ()<UNUserNotificationCenterDelegate>
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"AppierRNExample";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// get APNs notification token
- (void)application:(UIApplication*)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken
{
  NSUInteger deviceTokenLength = [deviceToken length];
  const unsigned char *bytes = (const unsigned char *)[deviceToken bytes];
  NSMutableString *deviceTokenString = [NSMutableString stringWithCapacity:deviceTokenLength * 2];
  
  for (NSUInteger i = 0; i < deviceTokenLength; i++) {
      [deviceTokenString appendFormat:@"%02x", bytes[i]];
  }
  
  NSLog(@"Device Token: %@", deviceTokenString);
  [[QGSdk getSharedInstance] setToken:deviceToken];
}

- (void)application:(UIApplication*)application didFailToRegisterForRemoteNotificationsWithError:(NSError*)error
{
  NSLog(@"Failed to get token, error: %@", error.localizedDescription);
}

// handling the click and deeplink events from push notification
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)(void))completionHandler API_AVAILABLE(ios(10.0)){
  [[QGSdk getSharedInstance] userNotificationCenter:center didReceiveNotificationResponse:response];
  completionHandler();
}

// used for silent push handling
// pass completion handler UIBackgroundFetchResult accordingly
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void(^)(UIBackgroundFetchResult))completionHandler
{
  [[QGSdk getSharedInstance] application:application didReceiveRemoteNotification:userInfo];
  completionHandler(UIBackgroundFetchResultNoData);
}

// handle foreground push
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void(^)(UNNotificationPresentationOptions options))completionHandler API_AVAILABLE(ios(10.0)){
  [[QGSdk getSharedInstance] userNotificationCenter:center willPresentNotification:notification];
  UNNotificationPresentationOptions option = UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert;
  completionHandler(option);
}

@end
