import React, { useContext, useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SignUpContext } from '../contexts/SignUpContext';

export default function SignIn({ navigation }) {
    const signUpContext = useContext(SignUpContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // reset sign up state on screen load
        // going back to sign in screen from sign up
        // going back to sign in screen after sign up completion
        signUpContext.resetState();
    }, []);

    function onForgotPassword() {
        navigation.navigate('ResetPassword');
    }

    async function onSignIn() {
        try {
            let res = await fetch(`http://192.168.1.15:8080/sign_in/?username=${username}&password=${password}`);
            let json = await res.json();

            console.log('RESPONSE:', res);
            console.log('JSON:', json);

            const userInfo = json.info;
            navigation.navigate('Cards', { user: userInfo });
        }
        catch(error) {
            console.log('Sign In error:', error);
        }
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
                        <TouchableWithoutFeedback onPress={onSignIn}>
                            <View style={{...styles.button, ...styles.buttonColored}}>
                                <Text style={{...styles.buttonText, color: colors.white}}>Sign in</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={onSignUp}>
                            <View style={{...styles.button, ...styles.buttonTransparent}}>
                                <Text style={{...styles.buttonText, color: colors.green}}>Sign up</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </SafeAreaView>
                <TouchableWithoutFeedback onPress={onForgotPassword}>
                    <View style={styles.forgotPassword}>
                        <Text style={{...styles.buttonText, color: colors.white}}>Forgot password</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </View>
    );
}

const BACKGROUND_IMAGE = require('../assets/images/cover_image.png');
const LINX_LOGO = require('../assets/images/linx_logo.png');
const colors = {
    green: '#439E73',
    white: '#FFF',
};

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
        backgroundColor: colors.green,
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
