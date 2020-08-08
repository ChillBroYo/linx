import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { grey, white } from '../constants/Colors';
import { SafeAreaView } from 'react-navigation';

export default function BarButton({ active, value, doPress }) {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={doPress}>
            <SafeAreaView style={[styles.button, active ? styles.buttonActive : null]}>
                <Text style={styles.text}>{value}</Text>
            </SafeAreaView>
        </TouchableOpacity>
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
    buttonActive: {
        backgroundColor: '#439E73',
    },
    text: {
        color: white,
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 27,
    },
});
