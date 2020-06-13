import React, { useContext } from 'react';
import {
    Alert,
    Keyboard,
    ScrollView,
    TextInput,
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
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import { lightGradient } from '../../constants/Colors';
import { SignUpContext } from '../../contexts/SignUpContext';

export default function UserName({ navigation }) {
    const {
        fname, setFname,
        lname, setLname,
    } = useContext(SignUpContext);

    function doBack() {
        navigation.goBack();
    }

    function doContinue() {
        if (!validateForm()) return;
        navigation.navigate('SignUpLocation');
    }

    function validateForm() {
        if (!fname) {
            Alert.alert('First name is empty');
            return;
        }
        else if (!lname) {
            Alert.alert('Last name is empty');
            return;
        }

        return true;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                <TopBar />
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    <ProgressBar step={2} totalSteps={TOTAL_STEPS} />
                    <BackArrow doPress={doBack} />
                    <ScrollView style={pageStyles.container}>
                        <PageHeader value='My name is' />
                        <Form>
                            <TextInput
                                name='fname'
                                placeholder='First Name'
                                value={fname}
                                onChangeText={fname => setFname(fname)}
                                clearButtonMode='while-editing'
                                style={formStyles.input}
                            />
                            <TextInput
                                name='lname'
                                placeholder='Last Name'
                                value={lname}
                                onChangeText={lname => setLname(lname)}
                                clearButtonMode='while-editing'
                                style={formStyles.input}
                            />
                        </Form>
                    </ScrollView>
                </LinearGradient>
                <BarButton value='Continue' doPress={doContinue} />
            </View>
        </TouchableWithoutFeedback>
    );
}
