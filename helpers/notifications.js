import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

// expoPushToken will be passed to callback
export async function registerForPushNotificationsAsync(callback) {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return Alert.alert('Failed to get push token for push notifications');
        }
        const expoPushToken = await Notifications.getExpoPushTokenAsync();
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
            vibrationPattern: [0, 250, 250, 250],
        });
    }
}

// listeners are not called when when present local notifications
// call .remove() on return value to remove listener
// listener is passed the notification object
// listener function: (notification) => { do something... }
export function addNotificationListenerBackground(listener) {
    console.log('background called');
    return Notifications.addNotificationResponseReceivedListener(listener);
}

export function addNotificationListenerForeground(listener) {
    console.log('foreground called');
    return Notifications.addNotificationReceivedListener(listener);
}

// https://docs.expo.io/versions/v35.0.0/sdk/notifications/#localnotification
export function presentLocalNotification(localNotification) {
    Notifications.scheduleNotificationAsync(localNotification);
}

