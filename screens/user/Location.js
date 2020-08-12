import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    Keyboard,
    SafeAreaView,
    ScrollView,
    StatusBar,
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
import { isSignUpRoute } from './helpers';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import { lightGradient, purple } from '../../constants/Colors';
import { UserContext } from '../../contexts/UserContext';

export default function UserLocation({ navigation }) {
    const isSignUpScreen = isSignUpRoute(navigation);
    const {
        city: contextCity,
        setCity: setContextCity,
        state: contextState,
        setState: setContextState,
        zip: contextZip,
        setZip: setContextZip,
        distance: contextDistance,
        setDistance: setContextDistance,
        doUpdateUser,
        formatUserForRequest,
    } = useContext(UserContext);
    const [city, setCity] = useState(contextCity);
    const [state, setState] = useState(contextState);
    const [zip, setZip] = useState(contextZip);
    const [distance, setDistance] = useState(contextDistance);

    useEffect(() => {
        StatusBar.setBarStyle(isSignUpScreen ? 'light-content' : 'dark-content');
    }, []);

    function doBack() {
        if (isSignUpScreen) {
            doUpdateContext();
        }
        navigation.goBack();
    }

    function doSubmit() {
        if (!validateForm()) return;
        isSignUpScreen ? doSignUp() : doUpdate();
    }

    async function doSignUp() {
        await doUpdateContext();
        navigation.navigate('SignUpBirthday');
    }

    function doUpdate() {
        const user = formatUserForRequest(true);
        user.info.connectWith.distance = distance;
        user.info.location.city = city.trim();
        user.info.location.state = state.trim();
        user.info.location.zip = zip.trim();
        doUpdateUser(user, doUpdateContext);
    }

    async function doUpdateContext() {
        await setContextCity(city.trim());
        await setContextState(state.trim());
        await setContextZip(zip.trim());
        await setContextDistance(distance);
    }

    function validateForm() {
        if (!city) {
            return Alert.alert('City is empty');
        }
        else if (!state) {
            return Alert.alert('State is empty');
        }
        else if (!zip) {
            return Alert.alert('ZIP Code is empty');
        }
        else {
            if (!validateZipCode()) {
                return Alert.alert('ZIP Code is not valid');
            }
        }

        return true;
    }

    function validateZipCode() {
        const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
        return zipCodeRegex.test(zip);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                {isSignUpScreen && <TopBar />}
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    {isSignUpScreen && <ProgressBar step={3} totalSteps={TOTAL_STEPS} />}
                    <SafeAreaView>
                        <BackArrow doPress={doBack} />
                    </SafeAreaView>
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
                            <TextInput
                                placeholder='ZIP Code'
                                value={zip}
                                onChangeText={zip => setZip(zip)}
                                clearButtonMode='while-editing'
                                keyboardType='number-pad'
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
                <BarButton
                    active={!!(city && state && zip)}
                    value={isSignUpScreen ? 'Continue' : 'Save'}
                    doPress={doSubmit}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}
