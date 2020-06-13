import React, { useContext } from 'react';
import {
    Alert,
    Keyboard,
    ScrollView,
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
    pageStyles,
    ProgressBar,
    TOTAL_STEPS,
    TopBar,
} from './common';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import { lightGradient, purple } from '../../constants/Colors';
import { SignUpContext } from '../../contexts/SignUpContext';

export default function UserLocation({ navigation }) {
    const {
        city, setCity,
        state, setState,
        distance, setDistance,
    } = useContext(SignUpContext);

    function doBack() {
        navigation.goBack();
    }

    function doContinue() {
        if (!validateForm()) return;
        navigation.navigate('SignUpBirthday');
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
            <View style={pageStyles.container}>
                <TopBar />
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    <ProgressBar step={3} totalSteps={TOTAL_STEPS} />
                    <BackArrow doPress={doBack} />
                    <ScrollView style={pageStyles.container}>
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
