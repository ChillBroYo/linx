import React, { useRef, useContext, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import ConfettiCannon from 'react-native-confetti-cannon';
import { UserContext } from '../../contexts/UserContext';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function ConfirmProfileScreen({ navigation }) {
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

        navigation.navigate('MainCards');
    }

    function getUserForOnboarding() {
        const user = formatUserForOnboarding();
        user.info.isOnboarded = isOnboarded;
        return user;
    }

    return(
        <View style={globalStyles.outerContainer}>
            <LinearGradient colors={['#439E73', 'rgba(254, 241, 2, 0)']} style={{height: '100%'}}>
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
                        <View style={globalStyles.emojiSymbol}>
                            <Emoji name="tada" style={globalStyles.emojiStyle} onLayout={() => setIsOnboarded(true)} onPress={shootCannon} />
                        </View>
                    </View>
                    <View style={globalStyles.confettiContainer}>
                        <ConfettiCannon count={100} origin={{ x: 175, y: 125 }} explosionSpeed={500} fallSpeed={2500} fadeOut={true}
                        autoStart={false} ref={cannon} onAnimationEnd={doCompleteOnboarding} />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}