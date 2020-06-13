// common components and styles for all sign up screens
import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    black,
    grey,
    purple,
} from '../../constants/Colors';
import { SafeAreaView } from 'react-navigation';

export function Form({ children }) {
    return <View style={formStyles.form}>{children}</View>;
}

export const formStyles = StyleSheet.create({
    form: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 60,
        marginVertical: 0,
    },
    input: {
        borderBottomColor: black,
        borderBottomWidth: 1,
        fontSize: 20,
        marginBottom: 10,
        padding: 10,
        height: 44,
        width: '100%',
    },
    text: {
        color: 'black',
        fontSize: 20,
        lineHeight: 25,
        marginTop: 20,
    },
    textBold: {
        color: purple,
        fontWeight: '700',
    },
});

export const pageStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export function PageHeader({ value }) {
    return <Text style={pageHeaderStyles.text}>{value}</Text>;
}

const pageHeaderStyles = StyleSheet.create({
    text: {
        color: purple,
        fontSize: 30,
        lineHeight: 41,
        marginBottom: 32,
        marginTop: 16,
        marginLeft: 60,
        marginRight: 60,
    },
});

export const TOTAL_STEPS = 6;
export function ProgressBar({ step, totalSteps }) {
    return (
        <View style={{
            ...progressBarStyles.container,
            width: `${(step / totalSteps) * 100}%`
        }} />
    );
}

const progressBarStyles = StyleSheet.create({
    container: {
        backgroundColor: purple,
        height: 11,
    }
});

export function TopBar() {
    return (
        <>
            <StatusBar barStyle='light-content' />
            <SafeAreaView style={topBarStyles.topBar} />
        </>
    );
}

const topBarStyles = StyleSheet.create({
    topBar: {
        backgroundColor: grey,
        minHeight: 26,
    },
});
