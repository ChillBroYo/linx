import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { black } from '../constants/Colors';

export default function BackArrow({ doPress }) {
    return (
        <Text onPress={doPress} style={style.backArrow}>
            &#10094;
        </Text>
    );
}

const style = StyleSheet.create({
    backArrow: {
        color: black,
        fontSize: 36,
        fontWeight: '900',
        marginBottom: 0,
        marginTop: 12,
        marginLeft: 30,
        marginRight: 30,
    },
});
