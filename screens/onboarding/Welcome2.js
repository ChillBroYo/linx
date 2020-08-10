import React, { useRef } from 'react';
import { Text, View, Image, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import { darkGradient } from '../../constants/Colors';
import { scaling } from '../helpers';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function WelcomeScreen({ navigation }) {
    const emojiAnim = useRef(new Animated.Value(0)).current;

    return (
        <View style={globalStyles.outerContainer}>
            <LinearGradient colors={darkGradient} style={{height: '100%'}}>
                <View style={globalStyles.innerContainer}>
                    <View style={styles.noTitleContainer} />
                    <View style={globalStyles.paginationContainer}>
                        <Text style={globalStyles.subtitleText}>Welcome!</Text>
                    </View>
                    <View style={globalStyles.contentContainer}>
                        <Text style={globalStyles.content}>React to things with the emojis. We will show you 15 things a day.</Text>
                    </View>
                    <View style={globalStyles.blankContainer} />
                    <View style={globalStyles.emojiContainer}>
                        <TouchableOpacity onPressIn={() => scaling.pressInAnim(emojiAnim)} onPressOut={() => scaling.pressOutAnim(emojiAnim)}
                            onPress={() => navigation.navigate('Welcome3')} style={scaling.scalingStyle(emojiAnim)}
                        >
                            <Animated.View style={globalStyles.emojiSymbol}>
                                <Emoji name="+1" style={globalStyles.emojiStyle} />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
