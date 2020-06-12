import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Form,
    formStyles,
    PageHeader,
    ProgressBar,
    TOTAL_STEPS,
    TopBar,
} from './common';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import { lightGradient } from '../../constants/Colors';

export default function UserName({ navigation }) {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    function doBack() {
        navigation.goBack();
    }

    function doContinue() {
        if (!validateForm()) return;

        let user = navigation.getParam('user');
        user.info = {};
        user.info.name = {
            first: fname.trim(),
            last: lname.trim(),
        };
        navigation.navigate('UserLocation', { user });
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
            <View style={styles.container}>
                <TopBar />
                <LinearGradient colors={lightGradient} style={styles.container}>
                    <ProgressBar step={2} totalSteps={TOTAL_STEPS} />
                    <BackArrow doPress={doBack} />
                    <ScrollView style={styles.container}>
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
                                clearButtonMode='while-editing'
                                name='lname'
                                placeholder='Last Name'
                                value={lname}
                                onChangeText={lname => setLname(lname)}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
