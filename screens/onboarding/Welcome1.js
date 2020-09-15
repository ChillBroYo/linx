import React, { useRef } from 'react';
import { Text, View, Image, Animated, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import { darkGradient } from '../../constants/Colors';
import { scaling } from '../helpers';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function WelcomeScreen1({ navigation }) {
    const emojiAnim = useRef(new Animated.Value(0)).current;

    return (
        <View style={globalStyles.outerContainer}>
            <LinearGradient colors={darkGradient} style={globalStyles.gradientContainer}>
                <SafeAreaView style={globalStyles.innerContainer}>
                    <View style={globalStyles.titleContainer}>
                        <Text style={globalStyles.transparentTitle}>Replace Title Here</Text>
                    </View>
                    <View style={globalStyles.paginationContainer}>
                        <Text style={globalStyles.subtitleText}>Welcome!</Text>
                    </View>
                    <View style={globalStyles.contentContainerImg}>
                        <Text style={globalStyles.content}>Linx connects you with like minded people for new friendships.</Text>
                        <Image source={require('../../assets/images/welcome1.png')} style={globalStyles.imageContent} />
                    </View>
                    <View style={globalStyles.blankContainer}>
                        <Text style={globalStyles.transparentVerify} >Enter Verify Here</Text>
                    </View>
                    <View style={globalStyles.emojiContainer}>
                        <TouchableOpacity onPressIn={() => scaling.pressInAnim(emojiAnim)} onPressOut={() => scaling.pressOutAnim(emojiAnim)}
                            onPress={() => navigation.navigate('Welcome2')} style={scaling.scalingStyle(emojiAnim)}
                        >
                            <Animated.View style={globalStyles.emojiSymbol}>
                                <Emoji name="+1" style={globalStyles.emojiStyle} />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}
