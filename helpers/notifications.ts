import { Alert, Platform } from 'react-native';
import { Notifications } from 'expo';
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
        Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
        });
    }
}

export function addNotificationListener(listener) {
    Notifications.addListener(listener);
}

// https://docs.expo.io/versions/v35.0.0/sdk/notifications/#localnotification
export function presentLocalNotification(localNotification) {
    Notifications.presentLocalNotificationAsync(localNotification);
}

