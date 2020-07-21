import React, { useContext, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient} from 'expo-linear-gradient';
import {
    black,
    grey,
    lightGradient,
    purple,
} from '../constants/Colors';
import { UserContext } from '../contexts/UserContext';

export default function Settings({ navigation }) {
    const {
        email,
        city,
        state,
        zip,
        distance,
        birthday,
        ageRange,
        gender,
        sameGender,
        interests,
        sameInterests,
    } = useContext(UserContext);

    useEffect(() => {
        StatusBar.setBarStyle('dark-content');
    }, []);

    function doBirthday() {
        navigation.navigate('SettingsBirthday');
    }

    function doEmail() {
        navigation.navigate('SettingsEmail');
    }

    function doGender() {
        navigation.navigate('SettingsGender');
    }

    function doInterests() {
        navigation.navigate('SettingsInterests');
    }

    function doLocation() {
        navigation.navigate('SettingsLocation');
    }

    function doLogout() {
        navigation.navigate('SignIn');
    }

    function doPassword() {
        navigation.navigate('SettingsPassword');
    }

    function doProfile() {
        navigation.navigate('SettingsProfile');
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={lightGradient} style={styles.container}>
                <SafeAreaView style={styles.mainWrapper}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.screenHeader}>Settings</Text>
                        <TouchableWithoutFeedback onPress={doProfile}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>Profile</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback onPress={doLocation}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>I live in</Text>
                                    <Text>{city}, {state} {zip}</Text>
                                    <Text>Max distance: {distance} miles</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback onPress={doBirthday}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>My birthday is</Text>
                                    <Text>{birthday}</Text>
                                    <Text>Age range:  {ageRange.join('-')} years old</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback onPress={doGender}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>I'm a</Text>
                                    <Text style={styles.settingsText}>{gender}</Text>
                                    <Text>Connect with {sameGender ? 'people like me' : 'everyone'}</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback onPress={doInterests}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>I like</Text>
                                    <Text>{interests.size} {interests.size == 1 ? 'thing' : 'things'}</Text>
                                    <Text>Connect with {sameInterests ? 'people with similar interests' : 'everyone'}</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback onPress={doEmail}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>Account email</Text>
                                    <Text>{email}</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback onPress={doPassword}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>Change password</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback onPress={doLogout}>
                            <Text style={styles.boldText}>Sign out</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <Text style={styles.italicText}>Delete account</Text>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}

// STYLES
const styles = StyleSheet.create({
    boldText: {
        color: black,
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 27,
        marginTop: 20,
        textAlign: 'center',
    },
    column: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    divider: {
        borderBottomColor: black,
        borderBottomWidth: 1,
        height: 1,
        marginBottom: 15,
        marginTop: 15,
    },
    italicText: {
        color: grey,
        fontSize: 20,
        fontStyle: 'italic',
        lineHeight: 27,
        marginBottom: 32,
        marginTop: 24,
        textAlign: 'center',
    },
    mainWrapper: {
        marginLeft: 37,
        marginRight: 37,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    screenHeader: {
        color: '#2B2D42',
        fontSize: 30,
        lineHeight: 41,
        marginBottom: 26,
        marginTop: 30,
        textAlign: 'center',
    },
    settingHeader: {
        color: purple,
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 5,
    },
    settingsText: {
        textTransform: 'capitalize',
    },
});
