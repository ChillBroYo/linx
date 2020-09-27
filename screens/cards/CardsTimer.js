import React, { useState, useRef } from 'react';
import { Text, View, Image, Animated, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { LinearGradient } from 'expo-linear-gradient';
import CountDown from 'react-native-countdown-component';
import Emoji from 'react-native-emoji';
import ConfettiCannon from 'react-native-confetti-cannon';
import MainCardsScreen from './MainCards';
import { timeDifference } from './helpers';
import { darkGradient } from '../../constants/Colors';
import { fadeInVals, fadeOutVals } from './helpers';
import { scaling } from '../helpers';
import { wp, hp, stdHeight } from '../../styles/helpers';
import { RFValue } from 'react-native-responsive-fontsize';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function CardsTimerScreen({ navigation, lastReaction }) {
    const [timerOver, setTimerOver] = useState(false);
    const [counter, setCounter] = useState(0);

    let cannon = useRef();
    function shootCannon() {
        cannon.current.start();
    }

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = Animated.timing(fadeAnim, fadeInVals);
    const fadeOut = Animated.timing(fadeAnim, fadeOutVals);

    const emojiAnim = useRef(new Animated.Value(0)).current

    if(timerOver) {
        return (<MainCardsScreen navigation={ navigation } />);
    };

    const diff = 24 * 60 * 60 - timeDifference(lastReaction);

	return(
		<View style={globalStyles.outerContainer}>
      		<LinearGradient colors={darkGradient} style={globalStyles.gradientContainer}>
      			<SafeAreaView style={globalStyles.innerContainer}>
                    <Animated.View style={[globalStyles.titleContainer, {opacity: fadeAnim}]}>
                        <CountDown until={diff} size={RFValue(30, stdHeight)} timeToShow={['H', 'M', 'S']} timeLabels={{h: null, m: null, s: null}} showSeparator={true}
                            separatorStyle={{color: '#FFF'}} digitStyle={{backgroundColor: 'transparent', width: wp(55), height: hp(35)}}
                            digitTxtStyle={{color: '#FFF', fontWeight: 'normal'}} onFinish={() => fadeOut.start(() => setTimerOver(true))}
                        />
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
