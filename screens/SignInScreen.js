import React, { useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import styled from '@emotion/native'

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSignIn() {
        try {
            let res = await fetch(`http://192.168.1.15:8080/sign_in/?username=${email}&password=${password}`);
            let json = await res.json();

            console.log('RESPONSE:', res);
            console.log('JSON:', json);

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
                <View style={styles.wrapper}>
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
                        <View style={StyleSheet.compose(styles.button, styles.buttonColored)}>
                            <Text style={StyleSheet.compose(styles.buttonText, styles.whiteText)}>Sign in</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={onSignUp}>
                        <View style={StyleSheet.compose(styles.button, styles.buttonTransparent)}>
                            <Text style={StyleSheet.compose(styles.buttonText, styles.coloredText)}>Sign up</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ImageBackground>
        </View>
    );
}

const BACKGROUND_IMAGE = { uri: 'https://linx-images.s3-us-west-2.amazonaws.com/reference/main_pic.png' };
const colors = {
    green: '#439E73',
    white: '#FFF',
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    wrapper: {
        alignItems: 'center',
    },
    header: {
        color: 'white',
        fontSize: 80,
        marginBottom: 36,
        marginTop: '20%',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderRadius: 10,
        marginBottom: 16,
        padding: 14,
        height: 48,
        width: 268,
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
        color: colors.white,
    },
    buttonTransparent: {
        backgroundColor: 'transparent',
        color: colors.green,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 27,
    },
    coloredText: {
        color: colors.green,
    },
    whiteText: {
        color: colors.white,
    },
});
