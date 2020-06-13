import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import {
    black,
    green,
    grey,
    purple,
} from '../constants/Colors';

export default function ResetPassword({ navigation }) {
    const [email, setEmail] = useState('');

    function onBack() {
        navigation.navigate('SignIn');
    }

    function onResetPassword() {
        // TODO: add email reset handler
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['rgba(254, 241, 2, 0)', 'rgba(254, 241, 2, 0.1)']} style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.wrapper}>
                        <Text onPress={onBack} style={styles.backArrow}>&#10094;</Text>
                        <View style={styles.column}>
                            <Text style={styles.header}>Forgot password?</Text>
                            <View style={styles.formWrapper}>
                                <Text style={styles.text}>
                                    Enter your email address and we'll send you a link to reset your password
                                </Text>
                                <TextInput
                                    name='email'
                                    placeholder='Email'
                                    value={email}
                                    onChangeText={email => setEmail(email)}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
                <TouchableWithoutFeedback onPress={onResetPassword}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Reset Password</Text>
                    </View>
                </TouchableWithoutFeedback>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    backArrow: {
        color: black,
        fontSize: 36,
        fontWeight: '900',
        marginBottom: 0,
        marginTop: 12,
        marginLeft: 30,
        marginRight: 30,
    },
    button: {
        alignItems: 'center',
        backgroundColor: grey,
        justifyContent: 'center',
        height: 66,
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
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
    formWrapper: {
        width: 252,
    },
    header: {
        color: purple,
        fontSize: 30,
        lineHeight: 41,
        marginTop: 30,
    },
    input: {
        borderBottomColor: black,
        borderBottomWidth: 1,
        fontSize: 20,
        marginBottom: 10,
        padding: 10,
        height: 44,
        width: '100%',
    },
    text: {
        fontSize: 20,
        lineHeight: 27,
        marginBottom: 40,
        marginTop: 30,
    },
    wrapper: {
        flex: 1,
    },
});
