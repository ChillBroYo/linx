import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { grey, white } from '../constants/Colors';
import {wp, hp, stdHeight} from '../styles/helpers';
import { RFValue } from 'react-native-responsive-fontsize';

export default function BarButton({ active, value, doPress }) {
    const insets = useSafeAreaInsets();

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={doPress}>
            <View
                style={[
                    styles.button,
                    active ? styles.buttonActive : null,
                    { paddingBottom: Math.max(insets.bottom, 12) }
                ]}
            >
                <Text style={styles.text}>{value}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: grey,
        justifyContent: 'center',
        minHeight: hp(60),
        paddingTop: hp(15),
    },
    buttonActive: {
        backgroundColor: '#439E73',
    },
    text: {
        color: white,
        fontSize: RFValue(20, stdHeight),
        fontWeight: '600',
        lineHeight: hp(30),
    },
});
