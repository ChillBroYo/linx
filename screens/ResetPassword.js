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
import { canOpenURL, openURL } from 'expo-linking';
import BackArrow from '../components/BackArrow';
import BarButton from '../components/BarButton';
import {
    black,
    green,
    grey,
    purple,
} from '../constants/Colors';

export default function ResetPassword({ navigation }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    function doBack() {
        navigation.navigate('SignIn');
    }

    async function doResetPassword() {
        if (!email || !username) return;

        try {
            const subject = 'Linx: Reset Password';
            const body = `Please reset password for the account with the following information:\n\nemail: ${email}\nusername: ${username}`;
            const URL = `mailto:kdpnp10@gmail.com?subject=${subject}&body=${body}`;
            const canOpenUrl = await canOpenURL(URL);
            if (!canOpenUrl) return;
            await openURL(URL);
        }
        catch (error) {
            console.warn('Error in doResetPassword:', error);
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['rgba(254, 241, 2, 0)', 'rgba(254, 241, 2, 0.1)']} style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.wrapper}>
                        <BackArrow doPress={doBack} />
                        <View style={styles.column}>
                            <Text style={styles.header}>Forgot password?</Text>
                            <View style={styles.formWrapper}>
                                <Text style={styles.text}>
                                    Enter your email address and username to reset your password
                                </Text>
                                <TextInput
                                    name='email'
                                    placeholder='Email'
                                    value={email}
                                    onChangeText={email => setEmail(email)}
                                    keyboardType='email-address'
                                    style={styles.input}
                                />
                                <TextInput
                                    name='username'
                                    placeholder='Username'
                                    value={username}
                                    onChangeText={username => setUsername(username)}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
            <BarButton value='Reset Password' doPress={doResetPassword} />
        </View>
    );
}

const styles = StyleSheet.create({
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
