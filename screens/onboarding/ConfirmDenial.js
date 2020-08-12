import React, { useRef, useContext, useState } from 'react';
import { Text, View, Image, Alert, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import ConfettiCannon from 'react-native-confetti-cannon';
import { UserContext } from '../../contexts/UserContext';
import { Camera } from 'expo-camera';
import * as Linking from 'expo-linking';
import { darkGradient } from '../../constants/Colors';
import { scaling } from '../helpers';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function ConfirmDenialScreen({ navigation }) {
    const emojiAnim = useRef(new Animated.Value(0)).current;

    const {
        isOnboarded:contextIsOnboarded,
        setIsOnboarded: setContextIsOnboarded,
        doCompleteOnboardingUser,
        formatUserForOnboarding,
    } = useContext(UserContext);
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
        setContextIsOnboarded(true);
        navigation.navigate('UserStatus');
    }

    function getUserForOnboarding() {
        const user = formatUserForOnboarding();
        user.info.isOnboarded = isOnboarded;
        return user;
    }

    async function checkPermission() {
        const { status } = await Camera.getPermissionsAsync();
        if (status === 'denied') {
            Alert.alert('Permission Denied',
                'Linx currently does not have permission to access Camera. Please go into Settings to grant Linx access.',
                [
                    { text: 'OK', style: 'cancel' },
                    { text: 'Settings', onPress: () => Linking.openSettings()}
                ],
                { cancelable: false }
            );
        } else {
            navigation.navigate('TakeProfile');
        }
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
                        <Text style={globalStyles.content}>Ok. You can always verify to connect with other verified people if you change your mind.</Text>
                    </View>
                    <View style={globalStyles.verifyContainer}>
                        <Text style={globalStyles.verify} onPress={checkPermission}>Verify with photo</Text>
                    </View>
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