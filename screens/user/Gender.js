import React, { useState } from 'react';
import {
    Keyboard,
    ScrollView,
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
    ProgressBar,
    TOTAL_STEPS,
    TopBar,
} from './common';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import PillButton from '../../components/PillButton';
import { grey, lightGradient, purple } from '../../constants/Colors';

export default function UserGender({ navigation }) {
    const [gender, setGender] = useState('');
    const [sameGender, setSameGender] = useState(false);
    const genderOptions = ['woman', 'man', 'other'];

    function doBack() {
        navigation.goBack();
    }

    function doContinue() {
        let user = navigation.getParam('user');
        user.info.gender = gender;
        user.info.connectWith.sameGender = sameGender;
        navigation.navigate('UserInterests', { user });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TopBar />
                <LinearGradient colors={lightGradient} style={styles.container}>
                    <ProgressBar step={5} totalSteps={TOTAL_STEPS} />
                    <BackArrow doPress={doBack} />
                    <ScrollView style={styles.container}>
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
                <BarButton value='Continue' doPress={doContinue} />
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
    container: {
        flex: 1,
    },
    toggle: {
        marginTop: 16,
    },
});
