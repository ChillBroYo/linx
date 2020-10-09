import React, { useRef, useState } from 'react';
import { Text, View, Image, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import ConfettiCannon from 'react-native-confetti-cannon';
import { UserTypes, useUserContext } from '../../contexts/UserContextFix';
import { darkGradient } from '../../constants/Colors';
import { scaling } from '../helpers';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function ConfirmProfileScreen({ navigation }) {
    const emojiAnim = useRef(new Animated.Value(0)).current;

    const {
        state: { isOnboarded: contextIsOnboarded },
        dispatch,
        doCompleteOnboardingUser,
        formatUserForOnboarding,
    } = useUserContext();
    const [isOnboarded, setIsOnboarded] = useState(contextIsOnboarded);

    let cannon = useRef();
    let shoot = false;
    function shootCannon() {
        if (!shoot) {
            shoot = true;
            cannon.current.start();
        }
    }

    async function doCompleteOnboarding() {
        const user = getUserForOnboarding();
        const isCompletedOnboarding = await doCompleteOnboardingUser(user);
        if (!isCompletedOnboarding) return;
        dispatch({
            type: UserTypes.SET_IS_ONBOARDED,
            payload: { isOnboarded: true },
        });
        navigation.navigate('UserStatus');
    }

    function getUserForOnboarding() {
        const user = formatUserForOnboarding();
        user.info.isOnboarded = isOnboarded;
        return user;
    }

    return(
        <View style={globalStyles.outerContainer}>
            <LinearGradient colors={darkGradient} style={{height: '100%'}}>
                <View style={globalStyles.innerContainer}>
                    <View style={globalStyles.titleContainer}>
                        <Text style={globalStyles.whiteTitle}>Let's start!</Text>
                    </View>
                    <View style={globalStyles.paginationContainer}>
                        <Image source={require('../../assets/icons/pagination_three.png')} style={globalStyles.paginationIcon} />
                    </View>
                    <View style={globalStyles.contentContainer}>
                        <Text style={globalStyles.content}>Great. Let's connect you with some people!</Text>
                    </View>
                    <View style={globalStyles.noContainer} />
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
                        <ConfettiCannon count={100} origin={{ x: 175, y: 125 }} explosionSpeed={500} fallSpeed={2500} fadeOut={true}
                            autoStart={false} ref={cannon} onAnimationEnd={doCompleteOnboarding}
                        />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
