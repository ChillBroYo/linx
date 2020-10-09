import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Keyboard,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { UserTypes, useUserContext } from '../../contexts/UserContextFix';

export default function UserGender({ navigation }) {
    const isSignUpScreen = isSignUpRoute(navigation);
    const {
        state: {
            interests: contextInterests,
            sameInterests: contextSameInterests,
        },
        dispatch,
        doSignUpUser,
        doUpdateUser,
        formatUserForRequest,
    } = useUserContext();
    const [interests, setInterests] = useState(contextInterests);
    const [sameInterests, setSameInterests] = useState(contextSameInterests);
    const interestsList = ['art', 'food', 'nature', 'sports'];

    useEffect(() => {
        StatusBar.setBarStyle(isSignUpScreen ? 'light-content' : 'dark-content');
    });

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
        const user = getUserForRequest(false);
        const isSignedUp = await doSignUpUser(user);
        if (!isSignedUp) return;
        navigation.navigate('SignIn', {data: true});
    }

    function doUpdate() {
        const user = getUserForRequest(true);
        doUpdateUser(user, doUpdateContext);
    }

    async function doUpdateContext() {
        await dispatch({
            type: UserTypes.SET_USER_FIELDS,
            payload: { interests, sameInterests },
        });
    }

    function getUserForRequest(isUpdate) {
        const user = formatUserForRequest(isUpdate);
        user.info.interests = [...interests];
        user.info.connectWith.sameInterests = sameInterests;
        return user;
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
                    <SafeAreaView edges={['top']}>
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
                <BarButton
                    active={true}
                    value={isSignUpScreen ? 'Done' : 'Save'}
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
