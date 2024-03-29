import React, { useRef, useState } from 'react';
import { Text, View, Image, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SafeAreaView from 'react-native-safe-area-view';
import Emoji from 'react-native-emoji';
import ConfettiCannon from 'react-native-confetti-cannon';
import { darkGradient } from '../../constants/Colors';
import { fadeInVals } from './helpers';
import { scaling } from '../helpers';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function CardsCompletionScreen({ navigation }) {
    const [counter, setCounter] = useState(0);

    let cannon = useRef();
    function shootCannon() {
        cannon.current.start();
    }

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = Animated.timing(fadeAnim, fadeInVals);

    const emojiAnim = useRef(new Animated.Value(0)).current;

    return(
        <View style={globalStyles.outerContainer}>
            <LinearGradient colors={darkGradient} style={globalStyles.gradientContainer}>
                <SafeAreaView style={globalStyles.innerContainer}>
                    <Animated.View style={[globalStyles.titleContainer, {opacity: fadeAnim}]}>
                        <Text style={globalStyles.whiteTitle}>Please Wait</Text>
                    </Animated.View>
                    <Animated.View style={[globalStyles.paginationContainer, {opacity: fadeAnim}]}>
                        <Text style={globalStyles.subtitleText}>until new cards are available</Text>
                    </Animated.View>
                    <View style={globalStyles.contentContainerImg}>
                        <Animated.Image source={require('../../assets/images/cards_completion.png')} onLoad={() => fadeIn.start()}
                            style={[globalStyles.imageContent, {opacity: fadeAnim}]}
                        />
                    </View>
                    <View style={globalStyles.noContainer}>
                        <Text style={globalStyles.transparentVerify}>Enter Verify Here</Text>
                    </View>
                    <View style={globalStyles.emojiTextContainer}>
                        <Text style={(counter == 0) ? globalStyles.transparentEmojiText : globalStyles.emojiText}>{counter}</Text>
                    </View>
                    <Animated.View style={[globalStyles.emojiContainer, {opacity: fadeAnim}]}>
                        <TouchableOpacity onPressIn={() => scaling.pressInAnim(emojiAnim)} onPressOut={() => scaling.pressOutAnim(emojiAnim)}
                            onPress={shootCannon} style={scaling.scalingStyle(emojiAnim)}
                        >
                            <Animated.View style={globalStyles.emojiSymbol}>
                                <Emoji name="tada" style={globalStyles.emojiStyle} />
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[globalStyles.confettiContainer, {opacity: fadeAnim}]}>
                        <ConfettiCannon count={50} origin={{ x: 0, y: 0 }} explosionSpeed={500} fallSpeed={2500} fadeOut={true}
                            autoStart={false} ref={cannon} onAnimationStart={() => setCounter(counter + 1)}
                        />
                    </Animated.View>
                </SafeAreaView>
            </LinearGradient>
        </View>
	);
}
