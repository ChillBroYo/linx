import React, { useRef, useContext, useState } from 'react';
import { Text, View, Image, Animated, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import ConfettiCannon from 'react-native-confetti-cannon';
import { UserContext } from '../../contexts/UserContext';
import { darkGradient } from '../../constants/Colors';
import Loader from '../../components/Loader';
import { scaling } from '../helpers';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function WelcomeScreen3({ navigation }) {
    const emojiAnim = useRef(new Animated.Value(0)).current;

    const {
        isOnboarded:contextIsOnboarded,
        setIsOnboarded: setContextIsOnboarded,
        doCompleteOnboardingUser,
        formatUserForOnboarding,
    } = useContext(UserContext);
    const [isOnboarded, setIsOnboarded] = useState(contextIsOnboarded);
    const [isLoading, setIsLoading] = useState(false);

    let cannon = useRef();
    let shoot = false;
    function shootCannon() {
        if (!shoot) {
            shoot = true;
            cannon.current.start();
        }
    }

    async function doCompleteOnboarding() {
        setIsLoading(true);
        const user = getUserForOnboarding();
        const isCompletedOnboarding = await doCompleteOnboardingUser(user);
        setIsLoading(false);
        if (!isCompletedOnboarding) return;
        setContextIsOnboarded(true);
        navigation.navigate('UserStatus');
    }

    function getUserForOnboarding() {
        const user = formatUserForOnboarding();
        user.info.isOnboarded = isOnboarded;
        return user;
    }

    return(
        <>
            <View style={globalStyles.outerContainer}>
                <LinearGradient colors={darkGradient} style={globalStyles.gradientContainer}>
                    <SafeAreaView style={globalStyles.innerContainer}>
                        <View style={globalStyles.noTitleContainer} />
                        <View style={globalStyles.paginationContainer}>
                            <Text style={globalStyles.subtitleText}>Welcome!</Text>
                        </View>
                        <View style={globalStyles.contentContainerImg}>
                            <Text style={globalStyles.content}>We will connect you to others who reacted similarly to you. Let's meet some new people!</Text>
                            <Image source={require('../../assets/images/welcome3.png')} style={globalStyles.imageContent} />
                        </View>
                        <View style={globalStyles.blankContainer} />
                        <View style={globalStyles.emojiContainer}>
                            <TouchableOpacity onPressIn={() => scaling.pressInAnim(emojiAnim)} onPressOut={() => scaling.pressOutAnim(emojiAnim)}
                                onPress={shootCannon} style={scaling.scalingStyle(emojiAnim)}
                            >
                                <Animated.View style={globalStyles.emojiSymbol}>
                                    <Emoji name="tada" style={globalStyles.emojiStyle} onLayout={() => setIsOnboarded(true)} />
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                        <View style={globalStyles.confettiContainer}>
                            <ConfettiCannon count={100} origin={{ x: 0, y: 0 }} explosionSpeed={500} fallSpeed={2500} fadeOut={true}
                                autoStart={false} ref={cannon} onAnimationEnd={doCompleteOnboarding}
                            />
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </View>
            <Loader visible={isLoading} />
        </>
    );
}
