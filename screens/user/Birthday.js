import React, { useEffect, useState } from 'react';
import {
    Alert,
    Keyboard,
    ScrollView,
    StatusBar,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { TextInputMask } from 'react-native-masked-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Form,
    formStyles,
    PageHeader,
    pageStyles,
    ProgressBar,
    TOTAL_STEPS,
    TOTAL_GOOGLE_STEPS,
    TopBar,
} from './common';
import { isSignUpRoute, isGoogleSignUpRoute } from './helpers';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import { lightGradient, purple } from '../../constants/Colors';
import { UserTypes, useUserContext } from '../../contexts/UserContext';

export default function UserBirthday({ navigation }) {
    const isSignUpScreen = isSignUpRoute(navigation);
    const isGoogleSignUpScreen = isGoogleSignUpRoute(navigation);
    const {
        state: {
            ageRange: contextAgeRange,
            birthday: contextBirthday,
        },
        dispatch,
        doUpdateUser,
        formatUserForRequest,
    } = useUserContext();
    const [birthday, setBirthday] = useState(contextBirthday);
    const [ageRange, setAgeRange] = useState(contextAgeRange);

    useEffect(() => {
        StatusBar.setBarStyle((isSignUpScreen || isGoogleSignUpScreen) ? 'light-content' : 'dark-content');
    }, []);

    async function doBack() {
        if (isSignUpScreen || isGoogleSignUpScreen) {
            await doUpdateContext();
        }
        navigation.goBack();
    }

    function doSubmit() {
        if (!validateForm()) return;
        (isSignUpScreen || isGoogleSignUpScreen) ? doSignUp() : doUpdate();
    }

    async function doSignUp() {
        await doUpdateContext();
        if (isSignUpScreen) {
            navigation.navigate('SignUpGender');
        } else {
            navigation.navigate('GoogleAccountGender');
        }
    }

    function doUpdate() {
        const user = formatUserForRequest(true);
        user.info.birthday = birthday.trim();
        user.info.connectWith.ageRange = ageRange;
        doUpdateUser(user, doUpdateContext);
        navigation.goBack();
    }

    async function doUpdateContext() {
        dispatch({
            type: UserTypes.SET_USER_FIELDS,
            payload: { ageRange, birthday },
        });
    }

    function validateForm() {
        if (!birthday) {
            return Alert.alert('Please verify your age');
        }
        else if (!verifyAge()) {
            return;
        }

        return true;
    }

    function verifyAge() {
        const [month, day, year] = birthday.split('/');
        // months are 0 index
        // passing birthday string in directly returns undefined
        const userDate = new Date(year, month - 1, day);
        const todayDate = new Date();

        // check year
        const yearDiff = todayDate.getFullYear() - userDate.getFullYear();
        const monthDiff = userDate.getMonth() - todayDate.getMonth();
        const dayDiff = userDate.getDate() - todayDate.getDate();

        if (dayDiff < 0 && monthDiff >= 0 && yearDiff <= 18) {
            return Alert.alert('Must be at least 18 years old to create an account');
        }

        return true;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                {(isSignUpScreen || isGoogleSignUpScreen) && <TopBar />}
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    {isSignUpScreen && <ProgressBar step={4} totalSteps={TOTAL_STEPS} />}
                    {isGoogleSignUpScreen && <ProgressBar step={2} totalSteps={TOTAL_GOOGLE_STEPS} />}
                    <SafeAreaView edges={['top']}>
                        <BackArrow doPress={doBack} />
                    </SafeAreaView>
                    <ScrollView style={pageStyles.container}>
                        <PageHeader value='My birthday is' />
                        <Form>
                            <TextInputMask
                                keyboardType='number-pad'
                                type='datetime'
                                options={{ format: 'MM/DD/YYYY' }}
                                placeholder='MM/DD/YYYY'
                                value={birthday}
                                onChangeText={birthday => setBirthday(birthday)}
                                clearButtonMode='while-editing'
                                style={{
                                    ...formStyles.input,
                                    borderBottomWidth: 0,
                                    textAlign: 'center'
                                }}
                            />
                            <Text style={formStyles.text}>
                                Connect with people who are between <Text style={formStyles.textBold}>{ageRange[0]}</Text> and <Text style={formStyles.textBold}>{ageRange[1]}</Text> years old
                            </Text>
                            <MultiSlider
                                min={18}
                                max={99}
                                values={ageRange}
                                onValuesChange={ageRange => setAgeRange(ageRange.map(age => parseInt(age)))}
                                selectedStyle={{ backgroundColor: purple }}
                                trackStyle={{ backgroundColor: purple }}
                            />
                        </Form>
                    </ScrollView>
                </LinearGradient>
                <BarButton
                    active={!!birthday}
                    value={(isSignUpScreen || isGoogleSignUpScreen) ? 'Continue' : 'Save'}
                    doPress={doSubmit}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}
