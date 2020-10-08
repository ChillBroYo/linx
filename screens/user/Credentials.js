import React, { useEffect, useState } from 'react';
import {
    Alert,
    Keyboard,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Form,
    formStyles,
    PageHeader,
    pageStyles,
    ProgressBar,
    TOTAL_STEPS,
    TopBar,
} from './common';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import TermsConditions from '../../components/TermsConditions';
import { black, purple, white, lightGradient } from '../../constants/Colors';
import { UserTypes, useUserContext } from '../../contexts/UserContext';

export default function UserCredentials({ navigation }) {
    const insets = useSafeAreaInsets();
    const { dispatch } = useUserContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRetype, setPasswordRetype] = useState('');
    const [username, setUsername] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [showTermsConditions, setShowTermsConditions] = useState(false);

    useEffect(() => {
        StatusBar.setBarStyle('light-content');
    }, []);

    function doBack() {
        navigation.navigate('SignIn');
    }

    async function doContinue() {
        if (!validateForm()) return;
        await doUpdateContext();
        navigation.navigate('SignUpProfile');
    }

    async function doUpdateContext() {
        await dispatch({
            type: UserTypes.SET_USER_FIELDS,
            payload: {
                email: email.trim(),
                password: password.trim(),
                username: username.trim(),
            },
        });
    }

    function validateForm() {
        if (!username) {
            return Alert.alert('Username is empty');
        }
        else if (!email) {
            return Alert.alert('Email is empty');
        }
        else if (!password || !passwordRetype) {
            return Alert.alert('Password is empty');
        }
        else if (password !== passwordRetype) {
            return Alert.alert('Passwords do not match');
        }
        else if (!isChecked) {
            return Alert.alert('Please agree to our terms and conditions to continue');
        }
        else {
            if (!validateUsername()) {
                return Alert.alert('Username is already taken');
            }
            if (!validateEmail()) {
                return Alert.alert('Email is not valid');
            }
        }

        return true;
    }

    function validateEmail() {
        // TODO: check if email is already in DB
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    }

    function validateUsername() {
        // TODO: check if username is already in DB
        return true;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                <TopBar />
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    <ProgressBar step={1} totalSteps={TOTAL_STEPS} />
                    <SafeAreaView edges={['top']}>
                        <BackArrow doPress={doBack} />
                    </SafeAreaView>
                    <ScrollView style={pageStyles.container}>
                        <PageHeader value='Sign up' />
                        <Form>
                            <TextInput
                                name='username'
                                placeholder='Username'
                                value={username}
                                onChangeText={username => setUsername(username)}
                                clearButtonMode='while-editing'
                                style={formStyles.input}
                            />
                            <TextInput
                                name='email'
                                placeholder='Email'
                                value={email}
                                onChangeText={email => setEmail(email)}
                                clearButtonMode='while-editing'
                                keyboardType='email-address'
                                style={formStyles.input}
                            />
                            <TextInput
                                name='password'
                                placeholder='Password'
                                value={password}
                                onChangeText={password => setPassword(password)}
                                clearButtonMode='while-editing'
                                secureTextEntry
                                style={formStyles.input}
                            />
                            <TextInput
                                name='passwordRetype'
                                placeholder='Retype Password'
                                value={passwordRetype}
                                onChangeText={password => setPasswordRetype(password)}
                                clearButtonMode='while-editing'
                                secureTextEntry
                                style={formStyles.input}
                            />
                            <View style={styles.eulaContainer}>
                                <TouchableWithoutFeedback onPress={() => setIsChecked(!isChecked)}>
                                    <MaterialIcons
                                        name={isChecked ? 'check-box' : 'check-box-outline-blank'}
                                        size={28}
                                        color={isChecked ? purple : black}
                                    />
                                </TouchableWithoutFeedback>
                                <Text style={styles.eulaText}>
                                    By signing up, I agree to the{' '}
                                    <Text
                                        onPress={() => setShowTermsConditions(true)}
                                        style={styles.eulaLink}
                                    >
                                        terms and conditions
                                    </Text>
                                </Text>
                                <Modal animationType='fade' transparent={true} visible={showTermsConditions}>
                                    <View style={[styles.modalContainer, { marginBottom: insets.bottom + 8, marginTop: insets.top + 8 }]}>
                                        <ScrollView>
                                            <TermsConditions />
                                        </ScrollView>
                                        <TouchableOpacity
                                            onPress={() => setShowTermsConditions(false)}
                                            style={styles.modalButton}
                                        >
                                            <Text>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>
                        </Form>
                    </ScrollView>
                </LinearGradient>
                <BarButton
                    active={!!(username && email && password && passwordRetype && isChecked)}
                    value='Continue'
                    doPress={doContinue}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    eulaContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    eulaText: {
        marginLeft: 5,
    },
    eulaLink: {
        color: purple,
        textDecorationColor: purple,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
    },

    modalContainer: {
        backgroundColor: white,
        borderRadius: 12,
        flex: 1,
        margin: 10,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});
