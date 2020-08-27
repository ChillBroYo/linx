import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
import { UserContext } from '../contexts/UserContext';
import { green, white } from '../constants/Colors';
import {
    addNotificationListener,
    registerForPushNotificationsAsync
} from '../helpers/notifications';

export default function SignIn({ navigation }) {
    const insets = useSafeAreaInsets();
    const {
        setExpoPushToken,
        doSignInUser,
        resetState: resetUserContextState,
    } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        // reset sign up state on screen load
        // going back to sign in screen from sign up
        // going back to sign in screen after sign up completion
        resetUserContextState();
    }, []);

    useLayoutEffect(() => {
        registerForPushNotificationsAsync(setExpoPushToken);

        function handleNotification(notification) {
            console.log('New notification:', { notification });
        }

        const notificationLogListener = addNotificationListener(handleNotification);

        return () => notificationLogListener.remove();
    }, []);

    useLayoutEffect(() => {
        getData();
    }, []);

    useLayoutEffect(() => {
        if (autoLogin) doSignIn();
    }, [autoLogin]);

    async function storeData() {
        try {
            await AsyncStorage.multiSet([['@username', username], ['@password', password], ['@signin', 'true']]);
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
        setIsLoading(true);
        const user = { username, password };
        const isSignedIn = await doSignInUser(user);
        if (!isSignedIn) {
            updateData();
            setPassword('');
            setAutoLogin(false);
            setIsLoading(false);
            return;
        }
        storeData();
        setIsLoading(false);
        navigation.navigate('Cards');
    }

    function onForgotPassword() {
        navigation.navigate('ResetPassword');
    }

    function onSignUp() {
        navigation.navigate('SignUp');
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
