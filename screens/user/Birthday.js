import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    Keyboard,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { TextInputMask } from 'react-native-masked-text';
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
import { lightGradient, purple } from '../../constants/Colors';
import { UserContext } from '../../contexts/UserContext';
import { getEnvVars } from '../../environment';
const { apiUrl } = getEnvVars();

export default function UserBirthday({ navigation }) {
    const isSignUpScreen = isSignUpRoute(navigation);
    const {
        birthday: contextBirthday,
        setBirthday: setContextBirthday,
        ageRange: contextAgeRange,
        setAgeRange: setContextAgeRange,
        doUpdateUser,
        formatUserForRequest,
    } = useContext(UserContext);
    const [birthday, setBirthday] = useState(contextBirthday);
    const [ageRange, setAgeRange] = useState(contextAgeRange);

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
        if (!validateForm()) return;
        isSignUpScreen ? doSignUp() : doUpdate();
    }

    async function doSignUp() {
        await doUpdateContext();
        navigation.navigate('SignUpGender');
    }

    function doUpdate() {
        const user = formatUserForRequest(true);
        user.info.birthday = birthday.trim();
        user.info.connectWith.ageRange = ageRange;
        doUpdateUser(user, doUpdateContext);
    }

    async function doUpdateContext() {
        await setContextBirthday(birthday);
        await setContextAgeRange(ageRange);
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
                {isSignUpScreen && <TopBar />}
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    {isSignUpScreen && <ProgressBar step={4} totalSteps={TOTAL_STEPS} />}
                    <SafeAreaView>
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
                <BarButton value={isSignUpScreen ? 'Continue' : 'Save'} doPress={doSubmit} />
            </View>
        </TouchableWithoutFeedback>
    );
}
