import React from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { black } from '../constants/Colors';

export default function BackArrow({ doPress }) {
    return (
        <TouchableWithoutFeedback onPress={doPress}>
            <Ionicons
                name="ios-arrow-back"
                style={style.backArrow}
            />
        </TouchableWithoutFeedback>
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
