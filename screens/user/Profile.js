import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    Keyboard,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
import { isSignUpRoute } from './helpers';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import { lightGradient, purple, white } from '../../constants/Colors';
import { UserContext } from '../../contexts/UserContext';

export default function UserName({ navigation }) {
    const isSignUpScreen = isSignUpRoute(navigation);
    const {
        firstName: contextFirstName,
        setFirstName: setContextFirstName,
        lastName: contextLastName,
        setLastName: setContextLastName,
    } = useContext(UserContext);
    const [firstName, setFirstName] = useState(contextFirstName);
    const [lastName, setLastName] = useState(contextLastName);

    useEffect(() => {
        StatusBar.setBarStyle(isSignUpScreen ? 'light-content' : 'dark-content');
    }, []);

    function doBack() {
        navigation.goBack();
    }

    function doSubmit() {
        if (!validateForm()) return;
        setContextFirstName(firstName);
        setContextLastName(lastName);
        // TODO: ADD PROFILE IMAGE
        isSignUpScreen ? navigation.navigate('SignUpLocation') : doBack();
    }

    function validateForm() {
        if (!firstName) {
            return Alert.alert('First name is empty');
        }
        else if (!lastName) {
            return Alert.alert('Last name is empty');
        }

        return true;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                {isSignUpScreen && <TopBar />}
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    {isSignUpScreen && <ProgressBar step={2} totalSteps={TOTAL_STEPS} />}
                    <SafeAreaView>
                        <BackArrow doPress={doBack} />
                    </SafeAreaView>
                    <ScrollView style={pageStyles.container}>
                        <PageHeader value={isSignUpScreen ? 'My name is' : 'Profile'} />
                        <Form>
                            {!isSignUpScreen && (
                                <TouchableWithoutFeedback>
                                    <View style={styles.profileImage}>
                                        <Text style={styles.profileInitials}>{firstName[0]}{lastName[0]}</Text>
                                        <View style={styles.cameraButton}>
                                            <Ionicons name="ios-camera" size={24} color={white} />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                            <TextInput
                                name='firstName'
                                placeholder='First Name'
                                value={firstName}
                                onChangeText={firstName => setFirstName(firstName)}
                                clearButtonMode='while-editing'
                                style={formStyles.input}
                            />
                            <TextInput
                                name='lastName'
                                placeholder='Last Name'
                                value={lastName}
                                onChangeText={lastName => setLastName(lastName)}
                                clearButtonMode='while-editing'
                                style={formStyles.input}
                            />
                        </Form>
                    </ScrollView>
                </LinearGradient>
                <BarButton value={isSignUpScreen ? 'Continue' : 'Save'} doPress={doSubmit} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    cameraButton: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        right: 0,
        backgroundColor: purple,
        borderRadius: 20,
        height: 40,
        width: 40,
        shadowColor: 'black',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 7,
    },
    profileImage: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: purple,
        borderRadius: 60,
        height: 120,
        width: 120,
        marginBottom: 40,
    },
    profileInitials: {
        color: white,
        fontSize: 40,
        lineHeight: 54,
        textTransform: 'capitalize',
    },
});