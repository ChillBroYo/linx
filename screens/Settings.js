import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient} from 'expo-linear-gradient';
import TermsConditions from '../components/TermsConditions';
import {
    black,
    grey,
    lightGradient,
    purple,
    white,
} from '../constants/Colors';
import { useUserContext } from '../contexts/UserContext';
import getApiEndpoint from '../helpers/apiEndpoint';

export default function Settings({ navigation }) {
    const insets = useSafeAreaInsets();
    const {
        state: {
            token,
            userId,
            email,
            city,
            state,
            zip,
            distance,
            birthday,
            ageRange,
            gender,
            sameGender,
        },
        doLogoutUser,
    } = useUserContext();
    const [showTermsConditions, setShowTermsConditions] = useState(false);

    useEffect(() => {
        StatusBar.setBarStyle('dark-content');
    }, []);

    function confirmDeleteAccount() {
        Alert.alert(
            'Are you sure you want to delete your account?',
            'This cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: doDeleteAccount,
                },
            ],
        );
    }

    function doBirthday() {
        navigation.navigate('SettingsBirthday');
    }

    async function doDeleteAccount() {
        try {
            const API_ENDPOINT = getApiEndpoint(['delete', 'account']);
            const params = new URLSearchParams();
            params.append('token', token);
            params.append('user_id', userId);
            const res = await axios.post(API_ENDPOINT, params);
            const data = res.data;

            if (res.status != 200) {
                return Alert.alert(data?.errmsg || 'Error while trying to delete account. Please try again.');
            }

            await removeStoredData();
            navigation.navigate('SignIn');
        }
        catch (error) {
            console.warn('error in doDeleteAccount:', error);
        }
    }

    function doEmail() {
        navigation.navigate('SettingsEmail');
    }

    function doGender() {
        navigation.navigate('SettingsGender');
    }

    function doLocation() {
        navigation.navigate('SettingsLocation');
    }

    async function doLogout() {
        await removeStoredData();
        doLogoutUser();
        navigation.navigate('SignIn');
    }

    function doPassword() {
        navigation.navigate('SettingsPassword');
    }

    function doProfile() {
        navigation.navigate('SettingsProfile');
    }

    async function removeStoredData() {
        try {
            await AsyncStorage.multiRemove(['@password', '@signin']);
        }
        catch (error) {
            console.warn('AsyncStorage remove error: ', error);
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={lightGradient} style={styles.container}>
                <SafeAreaView edges={['top']} style={styles.mainWrapper}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.screenHeader}>Settings</Text>
                        <TouchableOpacity onPress={doProfile}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>Profile</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity onPress={doLocation}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>I live in</Text>
                                    <Text>{city}, {state} {zip}</Text>
                                    <Text>Max distance: {distance} miles</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity onPress={doBirthday}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>My birthday is</Text>
                                    <Text>{birthday}</Text>
                                    <Text>Age range:  {ageRange.join('-')} years old</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity onPress={doGender}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>I'm a</Text>
                                    <Text style={styles.settingsText}>{gender}</Text>
                                    <Text>Connect with {sameGender ? 'people like me' : 'everyone'}</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity onPress={doEmail}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>Account email</Text>
                                    <Text>{email}</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity onPress={doPassword}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>Change password</Text>
                                </View>
                                <Ionicons name="ios-arrow-forward" size={20} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity onPress={() => setShowTermsConditions(true)}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>Terms and conditions</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity onPress={doLogout}>
                            <Text style={styles.boldText}>Sign out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={confirmDeleteAccount}>
                            <Text style={styles.italicText}>Delete account</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
            <Modal animationType='fade' transparent={true} visible={showTermsConditions}>
                <View style={[styles.modalContainer, { marginBottom: insets.bottom + 8, marginTop: insets.top + 8 }]}>
                    <ScrollView>
                        <TermsConditions />
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => setShowTermsConditions(false)}
                        style={styles.modalButton}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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

    modalContainer: {
        backgroundColor: white,
        borderRadius: 12,
        flex: 1,
        margin: 10,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});
