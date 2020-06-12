import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
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
import { lightGradient, purple } from '../../constants/Colors';

export default function UserLocation({ navigation }) {
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [distance, setDistance] = useState(25);

    function doBack() {
        navigation.goBack();
    }

    function doContinue() {
        if (!validateForm()) return;

        let user = navigation.getParam('user');
        user.info.location = {
            city: city.trim(),
            state: state.trim(),
        };
        user.info.connectWith = { distance };
        navigation.navigate('UserBirthday', { user });
    }

    function validateForm() {
        if (!city || !state) {
            Alert.alert('Missing City or State');
            return;
        }
        else if (!state) {
            Alert.alert('State is empty');
            return;
        }

        return true;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TopBar />
                <LinearGradient colors={lightGradient} style={styles.container}>
                    <ProgressBar step={3} totalSteps={TOTAL_STEPS} />
                    <BackArrow doPress={doBack} />
                    <ScrollView style={styles.container}>
                        <PageHeader value='I live in' />
                        <Form>
                            <TextInput
                                placeholder='City'
                                value={city}
                                onChangeText={city => setCity(city)}
                                clearButtonMode='while-editing'
                                style={formStyles.input}
                            />
                            <TextInput
                                placeholder='State'
                                value={state}
                                onChangeText={state => setState(state)}
                                clearButtonMode='while-editing'
                                style={formStyles.input}
                            />
                            <Text style={formStyles.text}>
                                Connect with people who are less than <Text style={formStyles.textBold}>{distance}</Text> miles away
                            </Text>
                            <MultiSlider
                                min={5}
                                max={50}
                                values={[distance]}
                                onValuesChange={distance => setDistance(parseInt(distance))}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
