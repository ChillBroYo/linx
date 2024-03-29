import React, { useEffect, useState } from 'react';
import {
    Alert,
    Keyboard,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { UserTypes, useUserContext } from '../../contexts/UserContext';
import {wp, hp, stdHeight} from '../../styles/helpers';
import { RFValue } from 'react-native-responsive-fontsize';
import { Camera } from 'expo-camera';
import * as Linking from 'expo-linking';
import { popup } from '../helpers';

export default function UserName({ navigation }) {
    const isSignUpScreen = isSignUpRoute(navigation);
    const {
        state: {
            firstName: contextFirstName,
            lastName: contextLastName,
            profileImg: contextProfileImg,
            alternateAccount,
        },
        dispatch,
        doUpdateUser,
        formatUserForRequest,
    } = useUserContext();
    const [firstName, setFirstName] = useState(contextFirstName);
    const [lastName, setLastName] = useState(contextLastName);
    const [profileImg, setProfileImg] = useState(contextProfileImg);

    useEffect(() => {
        StatusBar.setBarStyle(isSignUpScreen ? 'light-content' : 'dark-content');
    }, []);

    function doBack() {
        if (isSignUpScreen) {
            doUpdateContext();
        }
        navigation.goBack();
    }

    function doSubmit() {
        if (!validateForm()) return;
        isSignUpScreen ? doSignUp() : doUpdate();
    }

    async function doSignUp() {
        await doUpdateContext();
        navigation.navigate('SignUpLocation');
    }

    function doUpdate() {
        const user = formatUserForRequest(true);
        user.info.name.first = firstName.trim();
        user.info.name.last = lastName.trim();
        doUpdateUser(user, doUpdateContext);
        navigation.goBack();
    }

    async function doUpdateContext() {
        await dispatch({
            type: UserTypes.SET_USER_FIELDS,
            payload: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
            },
        });
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

    async function checkPermission() {
        const { status } = await Camera.getPermissionsAsync();
        if (status === 'denied') {
            Alert.alert(popup.title, popup.message,
                [
                    { text: popup.btn1Text, style: 'cancel' },
                    { text: popup.btn2Text, onPress: () => Linking.openSettings()}
                ],
                { cancelable: false }
            );
        } else {
            navigation.navigate('SettingsProfileImage');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                {isSignUpScreen && <TopBar />}
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    {isSignUpScreen && <ProgressBar step={2} totalSteps={TOTAL_STEPS} />}
                    <SafeAreaView edges={['top']}>
                        <BackArrow doPress={doBack} />
                    </SafeAreaView>
                    <ScrollView style={pageStyles.container}>
                        <PageHeader value={isSignUpScreen ? 'My name is' : 'Profile'} />
                        <Form>
                            {!isSignUpScreen && (
                                <View style={styles.profileImage}>
                                    {contextProfileImg
                                        ? <Image source={{ uri: contextProfileImg }} style={styles.image} />
                                        : <Text style={styles.profileInitials}>{firstName[0]}{lastName[0]}</Text>
                                    }
                                    <TouchableWithoutFeedback onPress={checkPermission}>
                                        <View style={styles.cameraButton}>
                                            <Ionicons name="ios-camera" size={RFValue(24, stdHeight)} color={white} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            )}
                            <TextInput
                                name='firstName'
                                placeholder='First Name'
                                value={firstName}
                                onChangeText={firstName => setFirstName(firstName)}
                                clearButtonMode='while-editing'
                                //editable={!alternateAccount ? true : false}
                                style={formStyles.input}
                            />
                            <TextInput
                                name='lastName'
                                placeholder='Last Name'
                                value={lastName}
                                onChangeText={lastName => setLastName(lastName)}
                                clearButtonMode='while-editing'
                                //editable={!alternateAccount ? true : false}
                                style={formStyles.input}
                            />
                        </Form>
                    </ScrollView>
                </LinearGradient>
                <BarButton
                    active={!!(firstName && lastName)}
                    value={isSignUpScreen ? 'Continue' : 'Save'}
                    doPress={doSubmit}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    cameraButton: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: hp(0),
        right: wp(0),
        backgroundColor: purple,
        borderRadius: hp(40/2),
        height: hp(40),
        width: hp(40),
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
        borderRadius: hp(150/2),
        height: hp(150),
        width: hp(150),
        marginBottom: hp(40),
    },
    image: {
        width: hp(150),
        height: hp(150),
        borderRadius: hp(150/2),
        overflow: 'hidden',
    },
    profileInitials: {
        color: white,
        fontSize: RFValue(40, stdHeight),
        lineHeight: hp(55),
        textTransform: 'uppercase',
    },
});
