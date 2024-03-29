import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './navigation/AppNavigator';
import { UserProvider } from './contexts/UserContext';

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const prefix = Linking.createURL('/');

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <SafeAreaProvider>
                <AppLoading
                    startAsync={loadResourcesAsync}
                    onError={handleLoadingError}
                    onFinish={() => handleFinishLoading(setLoadingComplete)}
                />
            </SafeAreaProvider>
        );
    } else {
        return (
            <SafeAreaProvider>
                <UserProvider>
                    <View style={styles.container}>
                        <StatusBar barStyle="light-content" />
                        <AppNavigator uriPrefix={prefix} />
                    </View>
                </UserProvider>
            </SafeAreaProvider>
        );
    }
}

async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([
            require('./assets/images/cover_image.png'),
            require('./assets/images/linx_logo.png'),
            require('./assets/images/robot-dev.png'),
            require('./assets/images/robot-prod.png'),
        ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free to
            // remove this if you are not using it in your app
            'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        }),
    ]);
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
