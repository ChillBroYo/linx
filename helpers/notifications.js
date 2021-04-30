import { Alert, Platform } from 'react-native';
import * as Linking from 'expo-linking';
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

export function addNotificationListenerBackground() {
    return Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('resonse', response);
        //Linking.openURL('exp://192.168.254.36:19000/--/main/friends/chat');
        //Linking.openURL('https://www.google.com/');
    });
}

export function addNotificationListenerForeground() {
    return Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
    });
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

export async function presentNotification(notification) {
    await Notifications.scheduleNotificationAsync(notification);
}

export function removeNotificationListener(listener) {
    Notifications.removeNotificationSubscription(listener);
}
