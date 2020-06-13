import React, { useContext, useState } from 'react';
import {
    Alert,
    Keyboard,
    SafeAreaView,
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
} from './common';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import { lightGradient } from '../../constants/Colors';
import { UserContext } from '../../contexts/UserContext';

export default function UserName({ navigation }) {
    const {
        firstName, setFirstName,
        lastName, setLastName,
    } = useContext(UserContext);
    const [fname, setFname] = useState(firstName || '');
    const [lname, setLname] = useState(lastName || '');

    function doBack() {
        navigation.goBack();
    }

    function doSave() {
        if (!validateForm) return;
        setFirstName(fname);
        setLname(lname);
        Alert.alert('Your profile has been updated');
    }

    function validateForm() {
        if (!fname) {
            return Alert.alert('First name is empty');
        }
        else if (!lname) {
            return Alert.alert('Last name is empty');
        }

        return true;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    <SafeAreaView>
                        <BackArrow doPress={doBack} />
                    </SafeAreaView>
                    <ScrollView style={pageStyles.container}>
                        <PageHeader value='Profile' />
                        <Form>
                            <TextInput
                                name='firstName'
                                placeholder='First name'
                                value={fname}
                                onChangeText={fname => setFname(fname)}
                                clearButtonMode='while-editing'
                                style={formStyles.input}
                            />
                            <TextInput
                                name='lastName'
                                placeholder='Last name'
                                value={lname}
                                onChangeText={lname => setLname(lname)}
                                clearButtonMode='while-editing'
                                style={formStyles.input}
                            />
                        </Form>
                    </ScrollView>
                </LinearGradient>
                <BarButton value='Save' doPress={doSave} />
            </View>
        </TouchableWithoutFeedback>
    );
}
