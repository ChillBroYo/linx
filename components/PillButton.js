import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { black, purple, white } from '../constants/Colors';

export default function PillButton({ selected, value, doPress}) {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={doPress}>
            <View style={StyleSheet.compose(styles.button, selected && styles.buttonSelected)}>
                <Text style={StyleSheet.compose(styles.text, selected && styles.textSelected)}>{value}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderColor: black,
        borderRadius: 100,
        borderStyle: 'solid',
        borderWidth: 1,
        height: '100%',
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
    },
    buttonSelected: {
        backgroundColor: purple,
        borderColor: purple,
    },
    text: {
        color: black,
        fontSize: 20,
        fontWeight: '400',
        textTransform: 'capitalize',
    },
    textSelected: {
        color: white,
        fontWeight: '700',
    },
});
