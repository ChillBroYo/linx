import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { green, white } from '../constants/Colors';
import {
    addNotificationListener,
    registerForPushNotificationsAsync
} from '../helpers/notifications';
import { getEnvVars } from '../environment';
const { apiUrl } = getEnvVars();

export default function SignIn({ navigation }) {
    const {
        setExpoPushToken,
        doSignInUser,
        resetState: resetUserContextState,
    } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // reset sign up state on screen load
        // going back to sign in screen from sign up
        // going back to sign in screen after sign up completion
        resetUserContextState();
    }, []);

    useEffect(() => {
        registerForPushNotificationsAsync(setExpoPushToken);

        function handleNotification(notification) {
            console.log('New notification:', { notification });
        }

        const notificationLogListener = addNotificationListener(handleNotification);

        return () => notificationLogListener.remove();
    }, []);

    async function doSignIn() {
        const user = { username, password };
        const isSignedIn = await doSignInUser(user);
        if (!isSignedIn) return;
        navigation.navigate('Cards');
    }

    function onForgotPassword() {
        navigation.navigate('ResetPassword');
    }

    function onSignUp() {
        navigation.navigate('SignUp');
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={BACKGROUND_IMAGE} style={styles.background}>
                <SafeAreaView style={styles.wrapper}>
                    <View style={styles.column}>
                        <Image source={LINX_LOGO} style={styles.header} />
                        <TextInput
                            placeholder='Username'
                            value={username}
                            onChangeText={(username) => setUsername(username)}
                            clearButtonMode='while-editing'
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Password'
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            clearButtonMode='while-editing'
                            secureTextEntry={true}
                            style={styles.input}
                        />
                        <TouchableOpacity activeOpacity={0.8} onPress={doSignIn}>
                            <View style={{...styles.button, ...styles.buttonColored}}>
                                <Text style={{...styles.buttonText, color: white}}>Sign in</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableWithoutFeedback onPress={onSignUp}>
                            <View style={{...styles.button, ...styles.buttonTransparent}}>
                                <Text style={{...styles.buttonText, color: green}}>Sign up</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </SafeAreaView>
                <TouchableWithoutFeedback onPress={onForgotPassword}>
                    <SafeAreaView style={styles.forgotPassword}>
                        <Text style={{...styles.buttonText, color: white}}>Forgot password</Text>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </View>
    );
}

const BACKGROUND_IMAGE = require('../assets/images/cover_image.png');
const LINX_LOGO = require('../assets/images/linx_logo.png');

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 16,
        height: 41,
        width: 164,
    },
    buttonColored: {
        backgroundColor: green,
    },
    buttonTransparent: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 27,
    },
    column: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    forgotPassword: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
    },
    header: {
        marginBottom: 32,
        marginTop: 50,
        maxHeight: 72,
        maxWidth: 157,
        resizeMode: 'contain',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderRadius: 10,
        marginBottom: 16,
        padding: 14,
        height: 48,
        width: 268,
    },
    wrapper: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
    },
});
