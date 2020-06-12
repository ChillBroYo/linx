import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import { grey, white } from '../constants/Colors';
import { SafeAreaView } from 'react-navigation';

export default function BarButton({ value, doPress }) {
    return (
        <TouchableWithoutFeedback onPress={doPress}>
            <SafeAreaView style={styles.button}>
                <Text style={styles.text}>{value}</Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: grey,
        justifyContent: 'center',
        minHeight: 48,
        paddingVertical: 12,
    },
    text: {
        color: white,
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 27,
    },
});
