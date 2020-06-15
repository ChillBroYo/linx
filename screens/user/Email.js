import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    Keyboard,
    SafeAreaView,
    ScrollView,
    StatusBar,
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
} from './common';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import { lightGradient } from '../../constants/Colors';
import { UserContext } from '../../contexts/UserContext';

export default function UserEmail({ navigation }) {
    const {
        email: contextEmail,
        setEmail: setContextEmail,
    } = useContext(UserContext);
    const [email, setEmail] = useState(contextEmail);

    useEffect(() => {
        StatusBar.setBarStyle('dark-content');
    }, []);

    function doBack() {
        navigation.goBack();
    }

    function doSave() {
        if (!validateEmail()) return;
        doUpdateContext();
        Alert.alert('Your email has been updated');
    }

    function doUpdateContext() {
        setContextEmail(email);
    }

    function validateEmail() {
        // TODO: check if email is already in DB
        const emailRegex = /\S+@\S+\.\S+/;
        return !emailRegex.test(email)
            ? Alert.alert('Email is not valid')
            : true;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    <SafeAreaView>
                        <BackArrow doPress={doBack} />
                    </SafeAreaView>
                    <ScrollView style={pageStyles.container}>
                        <PageHeader value='Account email' />
                        <Form>
                            <TextInput
                                name='email'
                                placeholder='Email'
                                value={email}
                                onChangeText={email => setEmail(email)}
                                clearButtonMode='while-editing'
                                style={formStyles.input}
                            />
                        </Form>
                    </ScrollView>
                </LinearGradient>
                <BarButton value='Save' doPress={doSave} />
            </View>
        </TouchableWithoutFeedback>
    );
}
