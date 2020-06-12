import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import { lightGradient } from '../constants/Colors';

export default function Settings({ navigation }) {
    return (
        <View style={styles.container}>
            <LinearGradient colors={lightGradient} style={styles.container}>
                <SafeAreaView style={styles.mainWrapper}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.screenHeader}>Settings</Text>
                        <TouchableWithoutFeedback>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>My name is</Text>
                                    <Text>NAME</Text>
                                </View>
                                <Text style={styles.arrow}>&#10095;</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>I live in</Text>
                                    <Text>LOCATION</Text>
                                    <Text>MAX DISTANCE TO CONNECT</Text>
                                </View>
                                <Text style={styles.arrow}>&#10095;</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>My birthday is</Text>
                                    <Text>LOCATION</Text>
                                    <Text>MAX DISTANCE TO CONNECT</Text>
                                </View>
                                <Text style={styles.arrow}>&#10095;</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>I'm a</Text>
                                    <Text>GENDER</Text>
                                    <Text>GENDER TO CONNECT WITH</Text>
                                </View>
                                <Text style={styles.arrow}>&#10095;</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>I like</Text>
                                    <Text>NUMBER OF INTERESTS</Text>
                                    <Text>CONNECT WITH INTERESTS</Text>
                                </View>
                                <Text style={styles.arrow}>&#10095;</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>Account email</Text>
                                    <Text>EMAIL</Text>
                                </View>
                                <Text style={styles.arrow}>&#10095;</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.settingHeader}>Change password</Text>
                                </View>
                                <Text style={styles.arrow}>&#10095;</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.divider} />
                        <TouchableWithoutFeedback>
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
const colors = {
    black: '#1B1B1B',
    grey: '#8D99AE',
    purple: '#8002FE',
};

const styles = StyleSheet.create({
    arrow: {
        fontSize: 20,
        fontWeight: '900',
    },
    boldText: {
        color: colors.black,
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
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        height: 1,
        marginBottom: 15,
        marginTop: 15,
    },
    italicText: {
        color: colors.grey,
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
        color: colors.purple,
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 5,
    },
});
