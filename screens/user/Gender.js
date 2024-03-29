import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Form,
    formStyles,
    PageHeader,
    pageStyles,
    ProgressBar,
    TOTAL_STEPS,
    TOTAL_ALTERNATE_STEPS,
    TopBar,
} from './common';
import { isSignUpRoute, isAlternateSignUpRoute } from './helpers';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import Loader from '../../components/Loader';
import PillButton from '../../components/PillButton';
import { grey, lightGradient, purple } from '../../constants/Colors';
import { UserTypes, useUserContext } from '../../contexts/UserContext';
import { wp, hp } from '../../styles/helpers';

export default function UserGender({ navigation }) {
    const isSignUpScreen = isSignUpRoute(navigation);
    const isAlternateSignUpScreen = isAlternateSignUpRoute(navigation);
    const {
        state: {
            gender: contextGender,
            sameGender: contextSameGender,
            username: contextUsername,
            password: contextPassword,
        },
        dispatch,
        doSignUpUser,
        doUpdateUser,
        formatUserForRequest,
    } = useUserContext();
    const genderOptions = ['woman', 'man', 'other'];
    const [gender, setGender] = useState(contextGender);
    const [sameGender, setSameGender] = useState(contextSameGender);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        StatusBar.setBarStyle((isSignUpScreen || isAlternateSignUpScreen) ? 'light-content' : 'dark-content');
    }, []);

    async function doBack() {
        if (isSignUpScreen || isAlternateSignUpScreen) {
            await doUpdateContext();
        }
        navigation.goBack();
    }

    function doSubmit() {
        (isSignUpScreen || isAlternateSignUpScreen) ? doSignUp() : doUpdate();
    }

    async function doSignUp() {
        setIsLoading(true);
        await doUpdateContext();
        const user = getUserForRequest(false);
        const isSignedUp = await doSignUpUser(user);
        setIsLoading(false);
        if (!isSignedUp) return;
        storeData();
        navigation.navigate('Cards');
    }

    async function storeData() {
        try {
            await AsyncStorage.multiSet([['@username', contextUsername], ['@password', contextPassword], ['@signin', 'true']]);
        }
        catch (error) {
            console.warn('AsyncStorage store error: ', error);
            Alert.alert('Please note you will need to sign back in upon closing the app');
        }
    }

    async function doUpdate() {
        const user = getUserForRequest(true);
        doUpdateUser(user, doUpdateContext);
        navigation.goBack();
    }

    async function doUpdateContext() {
        await dispatch({
            type: UserTypes.SET_USER_FIELDS,
            payload: { gender, sameGender },
        });
    }

    function getUserForRequest(isUpdate) {
        const user = formatUserForRequest(isUpdate);
        user.info.gender = gender;
        user.info.connectWith.sameGender = sameGender;
        return user;
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={pageStyles.container}>
                    {(isSignUpScreen || isAlternateSignUpScreen) && <TopBar />}
                    <LinearGradient colors={lightGradient} style={pageStyles.container}>
                        {isSignUpScreen && <ProgressBar step={5} totalSteps={TOTAL_STEPS} />}
                        {isAlternateSignUpScreen && <ProgressBar step={3} totalSteps={TOTAL_ALTERNATE_STEPS} />}
                        <SafeAreaView edges={['top']}>
                            <BackArrow doPress={doBack} />
                        </SafeAreaView>
                        <ScrollView style={pageStyles.container}>
                            <PageHeader value="I'm a" />
                            <Form>
                                { genderOptions.map(option => (
                                    <View key={option} style={styles.buttonWrapper}>
                                        <PillButton
                                            key={option}
                                            selected={gender == option}
                                            value={option}
                                            doPress={() => setGender(option)}
                                        />
                                    </View>
                                )) }
                                <Text style={formStyles.text}>
                                    Connect only with the same gender as me
                                </Text>
                                <Switch
                                    value={sameGender}
                                    onValueChange={sameGender => setSameGender(sameGender)}
                                    trackColor={{
                                        false: grey,
                                        true: purple
                                    }}
                                    style={styles.toggle}
                                />
                            </Form>
                        </ScrollView>
                    </LinearGradient>
                    <BarButton
                        active={!!gender}
                        value={(isSignUpScreen || isAlternateSignUpScreen) ? 'Done' : 'Save'}
                        doPress={doSubmit}
                    />
                </View>
            </TouchableWithoutFeedback>
            <Loader visible={isLoading} />
        </>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        marginBottom: hp(25),
        //marginTop: 0,
        //marginLeft: 11,
        //marginRight: 11,
        height: hp(45),
        width: wp(140),
    },
    toggle: {
        marginTop: hp(20),
    },
});
