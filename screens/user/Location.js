import React, { useEffect, useState } from 'react';
import {
    Alert,
    Keyboard,
    Modal,
    Picker,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
    Form,
    formStyles,
    PageHeader,
    pageStyles,
    ProgressBar,
    TOTAL_STEPS,
    TOTAL_ALTERNATE_STEPS,
    TopBar,
} from './common';
import { isSignUpRoute, isAlternateSignUpRoute } from './helpers';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import { lightGradient, purple } from '../../constants/Colors';
import { UserTypes, useUserContext } from '../../contexts/UserContext';
import {wp, hp, stdHeight} from '../../styles/helpers';
import { RFValue } from 'react-native-responsive-fontsize';

export default function UserLocation({ navigation }) {
    const isSignUpScreen = isSignUpRoute(navigation);
    const isAlternateSignUpScreen = isAlternateSignUpRoute(navigation);
    const {
        state: {
            city: contextCity,
            // state: contextState,
            zip: contextZip,
            distance: contextDistance,
        },
        dispatch,
        doValidateZip,
        doUpdateUser,
        formatUserForRequest,
    } = useUserContext();
    const [city, setCity] = useState(contextCity);
    // const [state, setState] = useState(contextState);
    const [zip, setZip] = useState(contextZip);
    const [distance, setDistance] = useState(contextDistance);
    const [showPicker, setShowPicker] = useState(false);

    var alternateInfo;
    if (isAlternateSignUpScreen) {
        alternateInfo = navigation.getParam('data');
    };

    useEffect(() => {
        StatusBar.setBarStyle((isSignUpScreen || isAlternateSignUpScreen) ? 'light-content' : 'dark-content');
    }, []);

    function doBack() {
        if (isSignUpScreen) {
            doUpdateContext();
            navigation.goBack();
        } else if (isAlternateSignUpScreen) {
            navigation.navigate('SignIn');
        } else {
            navigation.goBack();
        }
    }

    async function doSubmit() {
        if (!validateForm()) return;

        const result = await doCheckZip();
        if (!result) {
            return Alert.alert('Outside ZIP Code',
                'Linx is currently not available within the ZIP code you have entered. You can still sign up and react to cards. \
                Once Linx is in your area, we will match you up with friends in your area.',
                [
                    { text: 'OK', style: 'cancel', onPress: () => (isSignUpScreen || isAlternateSignUpScreen) ? doSignUp() : doUpdate() },
                ]
            );
        };

        (isSignUpScreen || isAlternateSignUpScreen) ? doSignUp() : doUpdate();
    }

    async function doSignUp() {
        await doUpdateContext();
        if (isSignUpScreen) {
            navigation.navigate('SignUpBirthday');
        } else {
            navigation.navigate('AlternateAccountBirthday');
        }
    }

    function doUpdate() {
        const user = formatUserForRequest(true);
        user.info.connectWith.distance = distance;
        user.info.location.city = city.trim();
        // user.info.location.state = state.trim();
        user.info.location.zip = zip.trim();
        doUpdateUser(user, doUpdateContext);
        navigation.goBack();
    }

    async function doUpdateContext() {
        if (isSignUpScreen) {
            await dispatch({
                type: UserTypes.SET_USER_FIELDS,
                payload: {
                    city: city.trim(),
                    // state: state.trim(),
                    zip: zip.trim(),
                    distance,
                    alternateAccount: false
                },
            });
        } else if (isAlternateSignUpScreen) {
            await dispatch({
                type: UserTypes.SET_USER_FIELDS,
                payload: {
                    city: city.trim(),
                    // state: state.trim(),
                    zip: zip.trim(),
                    distance,
                    alternateAccount: true,
                    email: alternateInfo.email,
                    username: alternateInfo.username,
                    firstName: alternateInfo.firstName,
                    lastName: alternateInfo.lastName,
                    password: alternateInfo.password
                },
            });
        } else {
            await dispatch({
                type: UserTypes.SET_USER_FIELDS,
                payload: {
                    city: city.trim(),
                    // state: state.trim(),
                    zip: zip.trim(),
                    distance,
                },
            });
        }
    }

    function validateForm() {
        if (!city) {
            return Alert.alert('City is empty');
        }
        // else if (!state) {
        //     return Alert.alert('State is empty');
        // }
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
        return zipCodeRegex.test(zip.trim());
    }

    async function doCheckZip() {
        const mainZip = { zip: zip.trim(), key: 123 };
        const result = await doValidateZip(mainZip);
        if (typeof result == 'boolean') return result;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                {(isSignUpScreen || isAlternateSignUpScreen) && <TopBar />}
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    {isSignUpScreen && <ProgressBar step={3} totalSteps={TOTAL_STEPS} />}
                    {isAlternateSignUpScreen && <ProgressBar step={1} totalSteps={TOTAL_ALTERNATE_STEPS} />}
                    <SafeAreaView edges={['top']}>
                        <BackArrow doPress={doBack} />
                    </SafeAreaView>
                    <ScrollView style={pageStyles.container}>
                        <PageHeader value='I live in' />
                        <Form>
                            <View style={formStyles.input}>
                                <Text
                                    onPress={() => setShowPicker(!showPicker)}
                                    style={styles.cityText}
                                >
                                    {city || 'Select an area'}
                                </Text>
                            </View>
                            <Modal animationType='slide' transparent={true} visible={showPicker}>
                                <TouchableWithoutFeedback onPress={() => setShowPicker(false)}>
                                    <View style={{flex: 1}} />
                                </TouchableWithoutFeedback>
                                <View style={styles.pickerWrapper}>
                                    <View style={styles.pickerButtonWrapper}>
                                        <Text
                                            onPress={() => setShowPicker(false)}
                                            style={styles.pickerButtonText}
                                        >
                                            Done
                                        </Text>
                                    </View>
                                    <Picker
                                        onValueChange={(itemValue) => setCity(itemValue)}
                                        selectedValue={city}
                                    >
                                        <Picker.Item label='Select an area' value='' />
                                        <Picker.Item label='San Francisco Bay Area, CA' value='San Francisco Bay Area, CA' />
                                        <Picker.Item label='Los Angeles Area, CA' value='Los Angeles Area, CA' />
                                        <Picker.Item label='Atlanta Area, GA' value='Atlanta Area, GA' />
                                    </Picker>
                                </View>
                            </Modal>
                            {/* LEAVING STATE FIELD IN FOR FUTURE */}
                            {/*<TextInput
                                placeholder='State'
                                value={state}
                                onChangeText={state => setState(state)}
                                clearButtonMode='while-editing'
                                style={formStyles.input}
                            />*/}
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
                    active={!!(city && zip)}
                    value={(isSignUpScreen || isAlternateSignUpScreen) ? 'Continue' : 'Save'}
                    doPress={doSubmit}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    cityText: {
        fontSize: RFValue(20, stdHeight),
    },
    pickerButtonWrapper: {
        alignItems: 'flex-end',
        paddingRight: wp(10),
        paddingTop: hp(10),
    },
    pickerButtonText: {
        color: 'blue',
        fontSize: RFValue(20, stdHeight),
    },
    pickerWrapper: {
        backgroundColor: 'white',
        bottom: hp(0),
        left: wp(0),
        right: wp(0),
        position: 'absolute',
    },
});
