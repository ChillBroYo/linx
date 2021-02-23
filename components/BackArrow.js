import React from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { black } from '../constants/Colors';
import { wp, hp, stdHeight } from '../styles/helpers';
import { RFValue } from 'react-native-responsive-fontsize';

export default function BackArrow({ doPress }) {
    return (
        <TouchableWithoutFeedback onPress={doPress}>
            <MaterialIcons
                name="arrow-back-ios"
                style={style.backArrow}
            />
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    backArrow: {
        color: black,
        fontSize: RFValue(35, stdHeight),
        fontWeight: '900',
        //marginBottom: 0,
        marginTop: hp(15),
        marginLeft: wp(30),
        //marginRight: 30,
    },
});
