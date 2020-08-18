import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    Keyboard,
    ScrollView,
    StatusBar,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        doUpdateUser,
        formatUserForRequest,
    } = useContext(UserContext);
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        StatusBar.setBarStyle('dark-content');
    }, []);

    function doBack() {
        navigation.goBack();
    }

    function doSave() {
        if (!verifyPassword()) return;
        doUpdate();
    }

    function doUpdate() {
        const user = formatUserForRequest(true);
        user.password = newPassword;
        doUpdateUser(user);
    }

    function verifyPassword() {
        // TODO: verify current password matches password on file
        return true;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    <SafeAreaView edges={['top']}>
                        <BackArrow doPress={doBack} />
                    </SafeAreaView>
                    <ScrollView style={pageStyles.container}>
                        <PageHeader value='Change password' />
                        <Form>
                            <TextInput
                                name='newPassword'
                                placeholder='New password'
                                value={newPassword}
                                onChangeText={password => setNewPassword(password)}
                                clearButtonMode='while-editing'
                                secureTextEntry
                                style={formStyles.input}
                            />
                        </Form>
                    </ScrollView>
                </LinearGradient>
                <BarButton
                    active={!!newPassword}
                    value='Save'
                    doPress={doSave}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}
