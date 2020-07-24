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
        doUpdateUser,
        formatUserForRequest,
    } = useContext(UserContext);
    const [gender, setGender] = useState(contextGender);
    const [sameGender, setSameGender] = useState(contextSameGender);
    const genderOptions = ['woman', 'man', 'other'];

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
        await doUpdateContext();
        navigation.navigate('SignUpInterests');
    }

    async function doUpdate() {
        const user = formatUserForRequest(true);
        user.info.gender = gender;
        user.info.connectWith.sameGender = sameGender;
        doUpdateUser(user, doUpdateContext);
    }

    async function doUpdateContext() {
        await setContextGender(gender);
        await setContextSameGender(sameGender);
    }

    return (
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
                    value={isSignUpScreen ? 'Continue' : 'Save'}
                    doPress={doSubmit}
                />
            </View>
        </TouchableWithoutFeedback>
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
