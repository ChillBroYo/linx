import React, { useContext } from 'react';
import {
    Alert,
    Keyboard,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
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
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import { lightGradient, purple } from '../../constants/Colors';
import { SignUpContext } from '../../contexts/SignUpContext';

export default function UserBirthday({ navigation }) {
    // TODO: load correct text
    const {
        birthday, setBirthday,
        ageRange, setAgeRange,
    } = useContext(SignUpContext);

    function doBack() {
        navigation.goBack();
    }

    function doContinue() {
        if (!validateForm()) return;
        navigation.navigate('SignUpGender');
    }

    function validateForm() {
        if (!birthday) {
            Alert.alert('Please verify your age');
            return;
        }
        else if (!verifyAge()) {
            return;
        }

        return true;
    }

    function verifyAge() {
        const [month, day, year] = birthday.split('/');
        // months are 0 index
        const userDate = new Date(year, month - 1, day);
        const todayDate = new Date();

        // check year
        const yearDiff = todayDate.getFullYear() - userDate.getFullYear();
        const monthDiff = userDate.getMonth() - todayDate.getMonth();
        const dayDiff = userDate.getDate() - todayDate.getDate();

        if (dayDiff < 0 && monthDiff >= 0 && yearDiff <= 18) {
            Alert.alert('Must be at least 18 years old to create an account');
            return;
        }

        return true;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                <TopBar />
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    <ProgressBar step={4} totalSteps={TOTAL_STEPS} />
                    <BackArrow doPress={doBack} />
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
                <BarButton value='Continue' doPress={doContinue} />
            </View>
        </TouchableWithoutFeedback>
    );
}
