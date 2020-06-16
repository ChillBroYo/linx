import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
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
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import {
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
import { getEnvVars } from '../../environment';
const { apiUrl: API_ENDPOINT } = getEnvVars();

export default function UserGender({ navigation }) {
    const isSignUpScreen = isSignUpRoute(navigation);
    const {
        interests: contextInterests,
        setInterests: setContextInterests,
        sameInterests: contextSameInterests,
        setSameInterests: setContextSameInterests,
        formatUserInfoForSignUp,
    } = useContext(UserContext);
    const [interests, setInterests] = useState(contextInterests);
    const [sameInterests, setSameInterests] = useState(contextSameInterests);
    const interestsList = ['art', 'food', 'nature', 'sports'];

    useEffect(() => {
        StatusBar.setBarStyle(isSignUpScreen ? 'light-content' : 'dark-content');
    });

    function doBack() {
        if (isSignUpScreen) {
            doUpdateContext();
        }
        navigation.goBack();
    }

    async function doSignUp() {
        try {
            // TODO: figure out how to update context after state changes
            // context passes a frozen version of the context to the page
            const user = formatUserInfoForSignUp();
            user.info.interests = [...interests];
            user.info.connectWith.sameInterests = sameInterests;

            const params = new URLSearchParams();
            for (let key in user) {
                params.append(key, typeof user[key] == 'object' ? JSON.stringify(user[key]) : user[key]);
            }
            const res = await axios.post(`${API_ENDPOINT}/${__DEV__ ? 'sign_up' : 'sign-up'}/`, params);
            const data = res.data;
            if (res.status != 200) {
                return Alert.alert('Sign up failed. Please try again');
            }
            if (!data.success || data.success == 'false') {
                return Alert.alert(data.errmsg);
            }

            navigation.navigate('SignIn');
        } catch (error) {
            Alert.alert('Sign up failed. Please try again');
        }
    }

    async function doSubmit() {
        await doUpdateContext();
        isSignUpScreen ? doSignUp() : doBack();
    }

    function doUpdateContext() {
        setContextInterests(interests);
        setContextSameInterests(sameInterests);
    }

    // FlatList renderItem passes { index: <i>, item: <data[i]> }
    function renderInterest({ item: interest }) {
        return (
            <View style={styles.buttonWrapper}>
                <PillButton
                    selected={interests.has(interest)}
                    value={interest}
                    text={interest}
                    doPress={() => toggleInterest(interest)}
                />
            </View>
        );
    }

    function toggleInterest(interest) {
        let nextInterests = new Set([...interests]);
        interests.has(interest) ? nextInterests.delete(interest) : nextInterests.add(interest);
        setInterests(nextInterests);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                {isSignUpScreen && <TopBar />}
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    {isSignUpScreen && <ProgressBar step={6} totalSteps={TOTAL_STEPS} />}
                    <SafeAreaView>
                        <BackArrow doPress={doBack} />
                    </SafeAreaView>
                    <ScrollView style={pageStyles.container}>
                        <PageHeader value='I like' />
                        <View style={styles.form}>
                            <FlatList
                                data={interestsList}
                                extraData={interests}
                                keyExtractor={interest => interest}
                                horizontal={false}
                                numColumns={2}
                                renderItem={renderInterest}
                            />
                            <View style={styles.textWrapper}>
                                <Text style={formStyles.text}>
                                    Connect only with people that like the same things as me
                                </Text>
                            </View>
                            <Switch
                                value={sameInterests}
                                onValueChange={sameInterests => setSameInterests(sameInterests)}
                                trackColor={{ false: grey, true: purple }}
                                style={styles.toggle}
                            />
                        </View>
                    </ScrollView>
                </LinearGradient>
                <BarButton value={isSignUpScreen ? 'Done' : 'Save'} doPress={doSubmit} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        marginBottom: 23,
        marginTop: 0,
        marginHorizontal: 11,
        height: 42,
        width: 140,
    },
    form: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 0,
    },
    textWrapper: {
        marginHorizontal: 40,
    },
    toggle: {
        marginTop: 16,
    },
});
