// common components and styles for all sign up screens
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    black,
    grey,
    purple,
} from '../../constants/Colors';
import {wp, hp, stdHeight} from '../../styles/helpers';
import { RFValue } from 'react-native-responsive-fontsize';

export function Form({ children }) {
    return <View style={formStyles.form}>{children}</View>;
}

export const formStyles = StyleSheet.create({
    form: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: wp(55),
        //marginVertical: 0,
    },
    input: {
        borderBottomColor: black,
        borderBottomWidth: 1,
        fontSize: RFValue(20, stdHeight),
        marginBottom: hp(15),
        paddingHorizontal: wp(10),
        height: hp(60),
        width: '100%',
    },
    text: {
        color: 'black',
        fontSize: RFValue(20, stdHeight),
        lineHeight: hp(30),
        marginTop: hp(20),
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
        fontSize: RFValue(30, stdHeight),
        lineHeight: hp(40),
        marginBottom: hp(60),
        marginTop: hp(20),
        marginLeft: wp(60),
        //marginRight: 60,
    },
});

export const TOTAL_STEPS = 6;
export const TOTAL_GOOGLE_STEPS = 4;
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
        height: hp(10),
    }
});

export function TopBar() {
    return (
        <SafeAreaView edges={['top']} style={topBarStyles.topBar} />
    );
}

const topBarStyles = StyleSheet.create({
    topBar: {
        backgroundColor: grey,
        minHeight: hp(30),
    },
});
