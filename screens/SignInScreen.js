import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    Alert,
    Image,
    ImageBackground,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-community/async-storage';
import * as Google from 'expo-google-app-auth';
import Loader from '../components/Loader';
import { UserTypes, useUserContext } from '../contexts/UserContext';
import { green, white } from '../constants/Colors';
import {
    addNotificationListenerBackground,
    addNotificationListenerForeground,
    displayNotificationForeground,
    registerForPushNotificationsAsync,
    removeNotificationListener
} from '../helpers/notifications';

displayNotificationForeground();

export default function SignIn({ navigation }) {
    const insets = useSafeAreaInsets();
    const {
        dispatch,
        doSignInUser,
        resetState: resetUserContextState,
    } = useUserContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [allowAppleSignIn, setAllowAppleSignIn] = useState(false)

    const googleLoginConfig = {
        iosClientId: `483225426792-0kscgtmo52h67qscnkrjhkmvdvu05hj0.apps.googleusercontent.com`,
        androidClientId: `483225426792-48d326lmbjsj4ageolvf38ai0ehdvitn.apps.googleusercontent.com`,
        iosStandaloneAppClientId: `483225426792-e2qkmrlhk9mqhh6d7ol5rrec8cokf5ht.apps.googleusercontent.com`,
        androidStandaloneAppClientId: `483225426792-n9e45j62sviq1t4voter5udrpdfbgnu7.apps.googleusercontent.com`,
    }

    useLayoutEffect(() => {
        validAppleSignIn();
    }, []);

    useLayoutEffect(() => {
        // reset sign up state on screen load
        // going back to sign in screen from sign up
        // going back to sign in screen after sign up completion
        resetUserContextState();
    }, []);

    useLayoutEffect(() => {
        registerForPushNotificationsAsync((expoPushToken) => {
            dispatch({
                type: UserTypes.SET_EXPO_PUSH_TOKEN,
                payload: { expoPushToken }
            });
        });

        function handleNotification(notification) {
            console.log('New notification:', { notification });
        }

        const notificationLogListenerBackground = addNotificationListenerBackground();
        const notificationLogListenerForeground = addNotificationListenerForeground();

        return () => {
            removeNotificationListener(notificationLogListenerBackground);
            removeNotificationListener(notificationLogListenerForeground);
        };
    }, []);

    useLayoutEffect(() => {
        getData();
    }, []);

    useLayoutEffect(() => {
        if (autoLogin) doSignIn();
    }, [autoLogin]);

    useEffect(() => {
        if (loginFailed) Alert.alert('Sign in failed. Please try again');
    }, [loginFailed]);

    async function storeData(id, constPassword) {
        try {
            if (id !== undefined && constPassword !== undefined) {
                await AsyncStorage.multiSet([['@username', id], ['@password', constPassword], ['@signin', 'true']]);
            } else {
                await AsyncStorage.multiSet([['@username', username], ['@password', password], ['@signin', 'true']]);
            }
        }
        catch (error) {
            console.warn('AsyncStorage store error: ', error);
            Alert.alert('Please note you will need to sign back in upon closing the app');
        }
    }

    async function getData() {
        try {
            const values = await AsyncStorage.multiGet(['@username', '@password', '@signin']);
            if (values[0][1] !== null) {
                setUsername(values[0][1]);
                if (values[1][1] !== null && values[2][1] !== null) {
                    setPassword(values[1][1]);
                    setAutoLogin(true);
                };
            };
        }
        catch (error) {
            console.warn('AsyncStorage get error: ', error);
        }
    }

    async function updateData() {
        try {
            await AsyncStorage.multiRemove(['@password', '@signin']);
        }
        catch (error) {
            console.warn('AsyncStorage update error: ', error);
        }
    }

    async function doSignIn() {
        setLoginFailed(false);
        setIsLoading(true);
        const user = { username, password };
        const isSignedIn = await doSignInUser(user);
        if (!isSignedIn) {
            updateData();
            setPassword('');
            setAutoLogin(false);
            setIsLoading(false);
            setLoginFailed(true);
            return;
        }
        storeData();
        setIsLoading(false);
        navigation.navigate('Cards');
    }

    async function googleSignIn() {
        try {
            const result = await Google.logInAsync(googleLoginConfig);
            if (result.type === 'success') {
                const user = {
                    username: result.user.id + '_GOOGLE',
                    email: result.user.email,
                    firstName: result.user.givenName,
                    lastName: result.user.familyName,
                    password: '$14GoogleSignIn52$'
                };
                checkAlternateAccount(user);
            } else {
                Alert.alert('Google Signin failed. Please try again');
            }
        } catch (error) {
            console.warn('Google Signin error:', error);
            Alert.alert('Google Signin failed. Please try again');
        }
    }

    async function validAppleSignIn() {
        try {
            const result = await AppleAuthentication.isAvailableAsync();
            setAllowAppleSignIn(result);
        } catch (error) {
            console.warn('Validate Apple Signin functionality:', error);
        }
    }

    async function appleSignIn() {
        try {
            const result = await AppleAuthentication.signInAsync({
                requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            const user = {
                username: result.user + '_APPLE',
                email: result.email,
                firstName: result.fullName.givenName,
                lastName: result.fullName.familyName,
                password: '$14AppleSignIn52$'
            };
            checkAlternateAccount(user);
        } catch (error) {
            console.warn('Apple Signin error:', error);
            Alert.alert('Apple Signin failed. Please try again');
        }
    }

    async function checkAlternateAccount(userInfo) {
        setLoginFailed(false);
        setIsLoading(true);
        const user = { username: userInfo.username, password: userInfo.password };
        const isSignedIn = await doSignInUser(user);
        if (!isSignedIn) {
            setIsLoading(false);
            navigation.navigate({
                routeName: 'AlternateAccount',
                action: NavigationActions.navigate({
                    routeName: 'AlternateAccountLocation',
                    params: { data: userInfo }
                })
            });
        } else {
            storeData(userInfo.username, userInfo.password);
            setIsLoading(false);
            navigation.navigate('Cards');
        }
    }

    function onSignUp() {
        navigation.navigate('SignUp');
    }

    function onForgotPassword() {
        navigation.navigate('ResetPassword');
    }

    if (autoLogin) {
        return (
            <View style={styles.container}>
                <ImageBackground source={BACKGROUND_IMAGE} style={styles.background} />
            </View>
        )
    };

    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={BACKGROUND_IMAGE} style={styles.background}>
                    <SafeAreaView edges={['top']} style={styles.wrapper}>
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
                            <TouchableOpacity activeOpacity={0.8} onPress={googleSignIn}>
                                <Image source={GOOGLE_SIGNIN} style={styles.googleSignIn} />
                            </TouchableOpacity>
                            {allowAppleSignIn &&
                                <AppleAuthentication.AppleAuthenticationButton
                                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                                    cornerRadius={0}
                                    style={styles.appleSignIn}
                                    onPress={appleSignIn}
                                />
                            }
                            <TouchableOpacity activeOpacity={0.8} onPress={onSignUp}>
                                <View style={{...styles.button, ...styles.buttonTransparent}}>
                                    <Text style={{...styles.buttonText, color: green}}>Sign up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                    <TouchableWithoutFeedback onPress={onForgotPassword}>
                        <View style={[styles.forgotPassword, {paddingBottom: insets.bottom || 28}]}>
                            <Text style={{...styles.buttonText, color: white}}>Forgot password</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </View>
            <Loader visible={isLoading} />
        </>
    );
}

const BACKGROUND_IMAGE = require('../assets/images/cover_image.png');
const LINX_LOGO = require('../assets/images/linx_logo.png');
const GOOGLE_SIGNIN = require('../assets/images/google_signin.png');

const styles = StyleSheet.create({
    appleSignIn:{
        marginTop: 10,
        height: 41,
        width: 164,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        height: 41,
        width: 164,
    },
    buttonColored: {
        marginTop: 16,
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
    },
    googleSignIn: {
        marginTop: 10,
        height: 41,
        width: 164,
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
        flexGrow: 1,
        justifyContent: 'space-between',
    },
});
