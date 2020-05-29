import React, { useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onForgotPassword() {
        navigation.navigate('ResetPassword');
    }

    async function onSignIn() {
        try {
            let res = await fetch(`http://192.168.1.15:8080/sign_in/?username=${email}&password=${password}`);
            let json = await res.json();

            console.log('RESPONSE:', res);
            console.log('JSON:', json);

            // TODO: add handler to handle successful response
            navigation.navigate('Home');
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
                        <Text style={styles.header}>Linx</Text>
                        <TextInput
                            placeholder='Email'
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Password'
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={true}
                            style={styles.input}
                        />
                        <TouchableWithoutFeedback onPress={onSignIn}>
                            <View style={{...styles.button, ...styles.buttonColored}}>
                                <Text style={{...styles.buttonText, ...styles.whiteText}}>Sign in</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={onSignUp}>
                            <View style={{...styles.button, ...styles.buttonTransparent}}>
                                <Text style={{...styles.buttonText, ...styles.coloredText}}>Sign up</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback onPress={onForgotPassword}>
                        <View style={styles.forgotPassword}>
                            <Text style={{...styles.buttonText, color: colors.white}}>Forgot password</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

// const BACKGROUND_IMAGE = { uri: 'https://linx-images.s3-us-west-2.amazonaws.com/reference/main_pic.png' };
const BACKGROUND_IMAGE = require('../assets/images/image.png');
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
    coloredText: {
        color: colors.green,
    },
    column: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    header: {
        color: 'white',
        fontSize: 80,
        marginBottom: 32,
        marginTop: 60,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderRadius: 10,
        marginBottom: 16,
        padding: 14,
        height: 48,
        width: 268,
    },
    whiteText: {
        color: colors.white,
    },
    wrapper: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
    },
});
