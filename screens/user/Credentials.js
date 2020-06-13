import React, { useContext } from 'react';
import {
    Alert,
    Keyboard,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
import { lightGradient } from '../../constants/Colors';
import { SignUpContext } from '../../contexts/SignUpContext';

export default function UserCredentials({ navigation }) {
    const {
        email, setEmail,
        password, setPassword,
        passwordRetype, setPasswordRetype,
        username, setUsername,
    } = useContext(SignUpContext);


    function doBack() {
        navigation.navigate('SignIn');
    }

    function doContinue() {
        if (!validateForm()) return;
        navigation.navigate('SignUpName');
    }

    function validateForm() {
        if (!username) {
            Alert.alert('Username is empty');
            return;
        }
        else if (!email) {
            Alert.alert('Email is empty');
            return;
        }
        else if (!password || !passwordRetype) {
            Alert.alert('Password is empty');
            return;
        }
        else if (password !== passwordRetype) {
            Alert.alert("Passwords do not match");
            return;
        }
        else {
            if (!validateUsername()) {
                Alert.alert('Username is already taken');
                return;
            }
            if (!validateEmail()) {
                Alert.alert('Email is not valid');
                return;
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
                    <BackArrow doPress={doBack} />
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
                        </Form>
                    </ScrollView>
                </LinearGradient>
                <BarButton value='Continue' doPress={doContinue} />
            </View>
        </TouchableWithoutFeedback>
    );
}
