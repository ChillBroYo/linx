import React, { useContext, useEffect, useState } from 'react';
import {
    Keyboard,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
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
import { isSignUpRoute } from './helpers';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import Loader from '../../components/Loader';
import PillButton from '../../components/PillButton';
import { grey, lightGradient, purple } from '../../constants/Colors';
import { UserContext } from '../../contexts/UserContext';

export default function UserGender({ navigation }) {
    const isSignUpScreen = isSignUpRoute(navigation);
    const {
        gender: contextGender,
        setGender: setContextGender,
        sameGender: contextSameGender,
        setSameGender: setContextSameGender,
        doSignUpUser,
        doUpdateUser,
        formatUserForRequest,
    } = useContext(UserContext);
    const genderOptions = ['woman', 'man', 'other'];
    const [gender, setGender] = useState(contextGender);
    const [sameGender, setSameGender] = useState(contextSameGender);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        StatusBar.setBarStyle(isSignUpScreen ? 'light-content' : 'dark-content');
    }, []);

    async function doBack() {
        if (isSignUpScreen) {
            await doUpdateContext();
        }
        navigation.goBack();
    }

    function doSubmit() {
        isSignUpScreen ? doSignUp() : doUpdate();
    }

    async function doSignUp() {
        setIsLoading(true);
        const user = getUserForRequest(false);
        const isSignedUp = await doSignUpUser(user);
        setIsLoading(false);
        if (!isSignedUp) return;
        navigation.navigate('SignIn', {data: true});
    }

    async function doUpdate() {
        const user = getUserForRequest(true);
        doUpdateUser(user, doUpdateContext);
    }

    async function doUpdateContext() {
        await setContextGender(gender);
        await setContextSameGender(sameGender);
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
                    {isSignUpScreen && <TopBar />}
                    <LinearGradient colors={lightGradient} style={pageStyles.container}>
                        {isSignUpScreen && <ProgressBar step={5} totalSteps={TOTAL_STEPS} />}
                        <SafeAreaView>
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
                        value={isSignUpScreen ? 'Done' : 'Save'}
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
        marginBottom: 23,
        marginTop: 0,
        marginLeft: 11,
        marginRight: 11,
        height: 42,
        width: 140,
    },
    toggle: {
        marginTop: 16,
    },
});
