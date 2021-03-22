import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// expoPushToken will be passed to callback
export async function registerForPushNotificationsAsync(callback) {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return Alert.alert('Failed to get push token for push notifications');
        }
        const expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;
        console.log({ expoPushToken });
        if (callback) {
            callback(expoPushToken);
        }
    }
    else {
        Alert.alert('Must use a physical device for push notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
            showBadge: true,
            vibrationPattern: [0, 250, 250, 250],
            enableVibrate: true
        });
    }
}

// listeners are not called when when present local notifications
// call .remove() on return value to remove listener
// listener is passed the notification object
// listener function: (notification) => { do something... }
export function addNotificationListenerBackground(listener) {
    return Notifications.addNotificationResponseReceivedListener(listener);
}

export function addNotificationListenerForeground(listener) {
    return Notifications.addNotificationReceivedListener(listener);
}

export function displayNotificationForeground() {
    return Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
            priority: Notifications.AndroidNotificationPriority.MAX
        }),
    });
}

// https://docs.expo.io/versions/v35.0.0/sdk/notifications/#localnotification
export function presentLocalNotification(localNotification) {
    Notifications.scheduleNotificationAsync(localNotification);
}

